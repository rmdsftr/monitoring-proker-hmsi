import {
  Injectable,
  UnauthorizedException,
  ForbiddenException,
  ExecutionContext
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from '../auth.service';
import { FILTERS_KEY } from '../decorators/filters.decorator';
import { StandardResponse } from '../../interfaces/standardResponse.interface';

// Interface untuk user payload yang lengkap - menggunakan nama yang tidak konflik
interface AnggotaUser {
  id_anggota: string;
  no_hima: string;
  nim: string;
  role: string;
  panggilan: string;
  id_periode?: string;
  id_divisi?: string;
  id_jabatan?: string;
  [key: string]: any; // untuk properti tambahan jika ada
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

// Extend User type dari Passport untuk include properties kita
declare global {
  namespace Express {
    interface User extends AnggotaUser {}
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const filters = this.reflector.get<string[]>(FILTERS_KEY, context.getHandler());

    try {
      // 🔹 1. Coba autentikasi dengan access token yang ada
      const canActivateResult = await this.tryAuthentication(context);
      
      if (canActivateResult) {
        // Pastikan user payload sudah ter-set dengan lengkap
        if (request.user) {
          this.validateUserPayload(request.user);
          this.checkFilters(request.user, filters);
          return true;
        }
      }

      // 🔹 2. Kalau gagal, coba refresh token
      const refreshResult = await this.attemptTokenRefresh(request, response);
      
      if (refreshResult) {
        // Coba autentikasi lagi setelah refresh
        const retryResult = await this.tryAuthentication(context);
        
        if (retryResult) {
          if (request.user) {
            this.validateUserPayload(request.user);
            this.checkFilters(request.user, filters);
            return true;
          }
        }
      }

      throw new UnauthorizedException('Authentication failed');
    } catch (err) {
      // Clear user info jika authentication gagal
      request.user = undefined;
      
      if (err instanceof UnauthorizedException || err instanceof ForbiddenException) {
        throw err;
      }
      
      console.error('JwtAuthGuard error:', err);
      throw new ForbiddenException('Access denied');
    }
  }

  /**
   * Coba melakukan autentikasi dengan JWT strategy
   */
  private async tryAuthentication(context: ExecutionContext): Promise<boolean> {
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (error) {
      // Log error untuk debugging jika perlu
      console.debug('JWT Authentication failed:', error.message);
      return false;
    }
  }

  /**
   * Coba refresh token jika access token expired
   */
  private async attemptTokenRefresh(request: Request, response: Response): Promise<boolean> {
    try {
      const refreshToken = request.cookies?.['refresh_token'];
      if (!refreshToken) {
        console.debug('No refresh token found in cookies');
        return false;
      }

      const refreshResult: StandardResponse<TokenResponse> = 
        await this.authService.refreshToken(request, response);

      if (refreshResult.status === 'success' && refreshResult.data?.accessToken) {
        // Update Authorization header dengan token baru
        request.headers.authorization = `Bearer ${refreshResult.data.accessToken}`;
        console.debug('Token refreshed successfully');
        return true;
      }

      console.debug('Token refresh failed:', refreshResult);
      return false;
    } catch (error) {
      console.debug('Token refresh error:', error.message);
      return false;
    }
  }

  /**
   * Validasi bahwa user payload memiliki semua properti yang diperlukan
   */
  private validateUserPayload(user: Express.User): void {
    // Validasi properti wajib
    const requiredFields = ['id_anggota', 'no_hima', 'nim', 'role', 'panggilan'];
    const missingFields = requiredFields.filter(field => !user[field]);

    if (missingFields.length > 0) {
      throw new UnauthorizedException(`Missing required user fields: ${missingFields.join(', ')}`);
    }

    // Log user info untuk debugging (remove di production)
    console.debug('Authenticated user:', {
      id_anggota: user.id_anggota,
      no_hima: user.no_hima,
      nim: user.nim,
      role: user.role,
      panggilan: user.panggilan,
      id_periode: user.id_periode || null,
      id_divisi: user.id_divisi || null,
      id_jabatan: user.id_jabatan || null
    });
  }

  /**
   * Check user permissions berdasarkan filters
   */
  private checkFilters(user: Express.User, filters?: string[]): void {
    if (!filters || filters.length === 0) {
      return; // Tidak ada filter, allow access
    }

    // Asumsi user.role digunakan untuk filtering
    // Sesuaikan dengan logika filtering yang Anda inginkan
    if (!filters.includes(user.role)) {
      throw new ForbiddenException(`Access denied. Required roles: ${filters.join(', ')}`);
    }
  }

  /**
   * Helper method untuk mendapatkan user info dari request
   * Gunakan ini di controller/service lain untuk akses user info
   */
  static getCurrentUser(request: Request): Express.User {
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }
    return request.user;
  }

  /**
   * Helper method untuk cek apakah user adalah pengurus
   */
  static isPengurus(request: Request): boolean {
    const user = this.getCurrentUser(request);
    return !!(user.id_periode && user.id_divisi && user.id_jabatan);
  }

  /**
   * Helper method untuk mendapatkan info pengurus
   */
  static getPengurusInfo(request: Request): { id_periode?: string; id_divisi?: string; id_jabatan?: string } | null {
    const user = this.getCurrentUser(request);
    if (this.isPengurus(request)) {
      return {
        id_periode: user.id_periode,
        id_divisi: user.id_divisi,
        id_jabatan: user.id_jabatan
      };
    }
    return null;
  }
}