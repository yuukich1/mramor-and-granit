import Link from 'next/link'

export default async function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 flex items-center justify-center px-4">
            <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-3xl blur-2xl" />
                
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-amber-100 shadow-2xl shadow-amber-200/30 p-12 max-w-lg">
                    <div className="text-center">
                        <div className="relative inline-block mb-8">
                            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full blur-xl opacity-20" />
                            <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-6xl font-serif font-bold text-white">404</span>
                            </div>
                        </div>

                        <h1 className="text-4xl font-serif text-neutral-800 mb-4 drop-shadow-sm">
                            Страница не найдена
                        </h1>
                        
                        <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                            К сожалению, запрашиваемая страница не существует или была перемещена. 
                            Возможно, она удалена или вы перешли по неверной ссылке.
                        </p>

                        <div className="space-y-4">
                            <Link 
                                href="/"
                                className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Вернуться на главную
                            </Link>
                            
                            <p className="text-sm text-neutral-500">
                                Если вы считаете, что это ошибка, свяжитесь с поддержкой
                            </p>
                        </div>
                    </div>
                </div>

                <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-lg" />
                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-to-r from-amber-300/20 to-orange-300/20 rounded-full blur-lg" />
            </div>
        </div>
    )
}