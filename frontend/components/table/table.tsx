import { useEffect, useState } from 'react';
import styles from "@/styles/components/table.module.css";
import { poppins } from '../fonts/fontname';
import { Button } from '../button/button';
import { FaPen, FaTrash } from 'react-icons/fa';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  hoverable?: boolean;
  radius?: number;
  ariaLabel?: string;
  maxWidth?: string | number;
  onRowClick?: (row: T) => void;
  showActions?: boolean;
  showAddition?:boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

export default function Table<T>({
  data,
  columns,
  hoverable = false,
  radius = 8,
  ariaLabel,
  maxWidth = "800px",
  onRowClick,
  showAddition = false,
  showActions = false,
  onEdit,
  onDelete
}: TableProps<T>) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setIsDark(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const containerStyle = {
    maxWidth: typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
    borderRadius: `${radius}px`,
  };

  if (data.length === 0) {
    return (
      <div 
        className={`${poppins.variable} ${styles.container} ${isDark ? styles.dark : styles.light}`}
        style={containerStyle}
      >
        <div className={styles.emptyState}>
          <svg 
            width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            className={styles.emptyIcon}
          >
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
          </svg>
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`${styles.container} ${isDark ? styles.dark : styles.light}`}
      style={containerStyle}
    >
      <table aria-label={ariaLabel} className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className={styles.th}
                style={{
                  textAlign: col.align || "left",
                  width: col.width,
                }}
              >
                {col.header}
              </th>
            ))}
            {showAddition && (
                <th className={styles.th} style={{ textAlign: "center", width: "120px" }}>
                    Sandi
                </th>
            )}
            {showActions && (
              <th className={styles.th} style={{ textAlign: "center", width: "120px" }}>
                Aksi
              </th>
            )}
          </tr>
        </thead>
        <tbody className={styles.tbody}>
          {data.map((row, rIdx) => {
            const isEven = rIdx % 2 === 0;
            return (
              <tr
                key={rIdx}
                className={`
                  ${styles.tr} 
                  ${isEven ? styles.evenRow : styles.oddRow}
                  ${(onRowClick || hoverable) ? styles.hoverable : ''}
                `}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((col, cIdx) => (
                  <td
                    key={cIdx}
                    className={styles.td}
                    style={{
                      textAlign: col.align || "left",
                    }}
                  >
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
                {showAddition && (
                    <td className={`${styles.td} ${styles.action}`} style={{ textAlign: "center" }}>
                        <Button variant='solid' color='secondary' size='sm'>Reset</Button>
                    </td>
                )}
                {showActions && (
                  <td className={`${styles.td} ${styles.action}`} style={{ textAlign: "center" }}>
                    <div className={styles.gap}>
                        <Button size='sm' className={styles.edit} color='tersier'
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit?.(row);
                            }}
                            >
                            <FaPen size={10} color='white'/>
                        </Button>
                        <Button size='sm' className={styles.hapus} color='danger'
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(row);
                            }}
                            >
                            <FaTrash size={10} color='white'/>
                        </Button>
                    </div>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
