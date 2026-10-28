import { useState, type FormEvent } from 'react';
import SectionTitle from './SectionTitle';
import {
  loadTransactions,
  saveTransactions,
  TRANSACTION_CATEGORIES,
  type Transaction,
  type TransactionType,
} from '@/lib/transactions';

type Status = 'idle' | 'success' | 'error';

export default function AddTransaction() {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(TRANSACTION_CATEGORIES.expense[0]);
  const [note, setNote] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = TRANSACTION_CATEGORIES[type];

  function switchType(next: TransactionType) {
    setType(next);
    setCategory(TRANSACTION_CATEGORIES[next][0]);
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};
    const amt = Number(amount);

    if (!amount || Number.isNaN(amt) || amt <= 0) {
      errs.amount = '请输入大于 0 的金额';
    }
    if (!category) {
      errs.category = '请选择分类';
    }
    if (!date) {
      errs.date = '请选择日期';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      setStatus('error');
      return;
    }

    const tx: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: Number(amount),
      category,
      note: note.trim(),
      date,
      createdAt: new Date().toISOString(),
    };

    try {
      const list = loadTransactions();
      list.unshift(tx);
      saveTransactions(list);
      setStatus('success');
      // 重置表单（保留日期与类型）
      setAmount('');
      setNote('');
      setCategory(TRANSACTION_CATEGORIES[type][0]);
      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  const inputClass =
    'w-full rounded-lg border border-dark-border bg-dark-bg px-3.5 py-2.5 text-sm text-dark-text placeholder-dark-muted/50 transition-colors focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40';

  return (
    <section className="px-4 py-20 md:px-6" id="transactions">
      <div className="mx-auto max-w-content">
        <SectionTitle subtitle="随手记一笔收支">
          添加记录
        </SectionTitle>

        <div className="mx-auto max-w-2xl">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-card border border-dark-border/60 bg-dark-card/50 p-6"
          >
            {/* 类型切换 */}
            <div
              role="tablist"
              aria-label="收支类型"
              className="mb-5 grid grid-cols-2 gap-1 rounded-lg bg-dark-bg p-1"
            >
              {(
                [
                  { key: 'expense', label: '支出' },
                  { key: 'income', label: '收入' },
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  role="tab"
                  aria-selected={type === t.key}
                  onClick={() => switchType(t.key)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                    type === t.key
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-dark-muted hover:text-dark-text'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {/* 金额 + 日期 */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="tx-amount"
                    className="mb-1.5 block text-xs font-medium text-dark-muted"
                  >
                    金额（¥）
                  </label>
                  <input
                    id="tx-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className={inputClass}
                  />
                  {errors.amount && (
                    <p className="mt-1 text-xs text-red-400" role="alert">
                      {errors.amount}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="tx-date"
                    className="mb-1.5 block text-xs font-medium text-dark-muted"
                  >
                    日期
                  </label>
                  <input
                    id="tx-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={inputClass}
                  />
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-400" role="alert">
                      {errors.date}
                    </p>
                  )}
                </div>
              </div>

              {/* 分类 */}
              <div>
                <label
                  htmlFor="tx-category"
                  className="mb-1.5 block text-xs font-medium text-dark-muted"
                >
                  分类
                </label>
                <select
                  id="tx-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-400" role="alert">
                    {errors.category}
                  </p>
                )}
              </div>

              {/* 备注 */}
              <div>
                <label
                  htmlFor="tx-note"
                  className="mb-1.5 block text-xs font-medium text-dark-muted"
                >
                  备注（可选）
                </label>
                <input
                  id="tx-note"
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="如：午餐、地铁通勤…"
                  maxLength={50}
                  className={inputClass}
                />
              </div>

              {/* 提交 */}
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                添加记录
              </button>

              {status === 'success' && (
                <p
                  className="text-center text-sm text-green-400"
                  role="status"
                >
                  ✓ 记录已保存
                </p>
              )}
              {status === 'error' && (
                <p
                  className="text-center text-sm text-red-400"
                  role="alert"
                >
                  保存失败，请检查输入或稍后重试。
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
