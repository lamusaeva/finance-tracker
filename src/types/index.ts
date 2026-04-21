export type Transaction = {
    id: string
    user_id: string
    amount: number
    type: 'income' | 'expense'
    description: string
    category_id: string | null
    date: string
    created_at: string
}

export type Category = {
    id: string
    user_id: string
    name: string
    icon: string | null
    color: string | null
}