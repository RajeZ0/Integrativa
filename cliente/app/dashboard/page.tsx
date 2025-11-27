'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
    const { user, isAuthenticated, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-foreground">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Mi Dashboard</h1>
                        <p className="text-muted-foreground">Bienvenido, {user.name}</p>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={() => router.push('/')}
                            className="px-6 py-3 bg-card border border-border text-foreground rounded-lg hover:bg-muted/50 transition-all"
                        >
                            Ir al Sitio
                        </button>
                        <button
                            onClick={logout}
                            className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:opacity-90 transition-all"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-8 mb-6 card-hover-effect">
                    <div className="flex items-center mb-6">
                        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mr-6">
                            <span className="text-3xl font-bold text-primary">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                            <p className="text-muted-foreground">{user.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">Rol</p>
                            <p className="text-lg font-semibold text-foreground">{user.role.name}</p>
                        </div>
                        <div className="p-4 bg-muted/30 rounded-lg">
                            <p className="text-sm text-muted-foreground mb-1">ID de Usuario</p>
                            <p className="text-lg font-semibold text-foreground font-mono">{user.id}</p>
                        </div>
                    </div>
                </div>

                {/* Welcome Message */}
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-8">
                    <h3 className="text-xl font-bold text-foreground mb-4">¡Bienvenido a METZLI!</h3>
                    <p className="text-muted-foreground mb-4">
                        Has iniciado sesión exitosamente como usuario regular. Aquí podrás acceder a todas tus funciones y configuraciones.
                    </p>
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                        <p className="text-sm text-foreground">
                            <span className="font-semibold">Nota:</span> Como usuario regular, tienes acceso a tu panel personalizado.
                            Los administradores tienen acceso a funciones adicionales en el panel de administración.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
