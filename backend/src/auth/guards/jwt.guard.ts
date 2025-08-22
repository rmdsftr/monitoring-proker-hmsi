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

interface AnggotaUser {
  id_anggota: string;
  id_pengurus: string;
  role: string;
  panggilan: string;
  id_periode: string;
  id_fungsional: string;
  id_jabatan: string;
  [key: string]: any; 
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

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
      const canActivateResult = await this.tryAuthentication(context);

      if (canActivateResult && request.user) {
        this.validateUserPayload(request.user);
        this.checkFilters(request.user, filters);
        return true;
      }

      const refreshResult = await this.attemptTokenRefresh(request, response);

      if (refreshResult) {
        const retryResult = await this.tryAuthentication(context);
        if (retryResult && request.user) {
          this.validateUserPayload(request.user);
          this.checkFilters(request.user, filters);
          return true;
        }
      }

      throw new UnauthorizedException('Authentication failed');
    } catch (err) {
      request.user = undefined;
      if (err instanceof UnauthorizedException || err instanceof ForbiddenException) {
        throw err;
      }
      console.error('JwtAuthGuard error:', err);
      throw new ForbiddenException('Access denied');
    }
  }

  private async tryAuthentication(context: ExecutionContext): Promise<boolean> {
    try {
      return (await super.canActivate(context)) as boolean;
    } catch (error) {
      console.debug('JWT Authentication failed:', error.message);
      return false;
    }
  }

  private async attemptTokenRefresh(request: Request, response: Response): Promise<boolean> {
    try {
      const refreshToken = request.cookies?.['refresh_token'];
      if (!refreshToken) return false;

      const refreshResult: StandardResponse<TokenResponse> =
        await this.authService.refreshToken(request, response);

      if (refreshResult.status === 'success' && refreshResult.data?.accessToken) {
        request.headers.authorization = `Bearer ${refreshResult.data.accessToken}`;
        console.debug('Token refreshed successfully');
        return true;
      }
      return false;
    } catch (error) {
      console.debug('Token refresh error:', error.message);
      return false;
    }
  }

  private validateUserPayload(user: Express.User): void {
    // Core required fields that must always exist
    const coreRequiredFields = [
      'id_anggota',
      'id_pengurus',
      'role',
      'panggilan',
      'id_periode'
    ];

    // Optional fields that can be empty string but should exist
    const optionalFields = [
      'id_fungsional',
      'id_jabatan'
    ];

    // Check core required fields
    const missingCoreFields = coreRequiredFields.filter(field => 
      !user[field] || user[field] === ''
    );
    
    if (missingCoreFields.length > 0) {
      throw new UnauthorizedException(`Missing required user fields: ${missingCoreFields.join(', ')}`);
    }

    // Check optional fields exist (but can be empty string)
    const missingOptionalFields = optionalFields.filter(field => 
      user[field] === undefined || user[field] === null
    );
    
    if (missingOptionalFields.length > 0) {
      throw new UnauthorizedException(`Missing user fields: ${missingOptionalFields.join(', ')}`);
    }

    console.debug('Authenticated user:', {
      id_anggota: user.id_anggota,
      role: user.role,
      panggilan: user.panggilan,
      isPengurus: !!(user.id_fungsional && user.id_jabatan)
    });
  }

  private checkFilters(user: Express.User, filters?: string[]): void {
    if (!filters || filters.length === 0) return;

    if (!filters.includes(user.role)) {
      throw new ForbiddenException(`Access denied. Required roles: ${filters.join(', ')}`);
    }
  }

  // ───── Helper methods ─────
  static getCurrentUser(request: Request): Express.User {
    if (!request.user) throw new UnauthorizedException('User not authenticated');
    return request.user;
  }

  static isPengurus(request: Request): boolean {
    const user = this.getCurrentUser(request);
    return !!(user.id_periode && user.id_fungsional && user.id_jabatan && 
              user.id_fungsional !== '' && user.id_jabatan !== '');
  }

  static getPengurusInfo(request: Request): {
    id_periode: string;
    id_fungsional: string;
    id_jabatan: string;
  } | null {
    const user = this.getCurrentUser(request);
    if (this.isPengurus(request)) {
      return {
        id_periode: user.id_periode,
        id_fungsional: user.id_fungsional,
        id_jabatan: user.id_jabatan
      };
    }
    return null;
  }
}