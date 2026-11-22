export type AdminAnalytics = {
    totalUsers: number
    totalEquipment: number
    totalBookings: number
    pendingApprovals: number
    completedRentals: number
    totalRevenue: number
    monthlyBookings: { month: string; bookings: number }[]
}

export type OwnerAnalytics = {
    totalEquipment: number
    completedRentals: number
    totalEarnings: number
    monthlyEarnings: { month: string; earnings: number }[]
}
