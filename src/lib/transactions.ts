export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  note: string;
  date: string; // YYYY-MM-DD
  createdAt: string; // ISO
}

const STORAGE_KEY = 'gerenwangye.transactions';

export const TRANSACTION_CATEGORIES: Record<TransactionType, string[]> = {
  income: ['工资', '奖金', '投资收益', '副业', '其他'],
  expense: ['餐饮', '交通', '购物', '居住', '娱乐', '医疗', '其他'],
};

/** 读取本地存储的记账记录 */
export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as Transaction[]) : [];
  } catch {
    return [];
  }
}

/** 保存记账记录到本地存储 */
export function saveTransactions(list: Transaction[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // 存储不可用时静默失败（如隐私模式）
  }
}
