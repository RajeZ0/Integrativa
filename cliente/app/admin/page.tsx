'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import ProjectList from '@/components/admin/ProjectList';
import ProjectForm from '@/components/admin/ProjectForm';

export default function AdminPage() {
    const { user, isAuthenticated, isAdmin, logout, loading } = useAuth();
    const router = useRouter();
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [refreshProjects, setRefreshProjects] = useState(0);

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push('/login');
            } else if (!isAdmin) {
                router.push('/dashboard');
            }
        }
    }, [isAuthenticated, isAdmin, loading, router]);

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-foreground">Cargando...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-4xl font-bold text-foreground mb-2">Panel de Administrador</h1>
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

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* ... stats cards code ... */}
                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 card-hover-effect">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Total Usuarios</p>
                                <p className="text-3xl font-bold text-foreground">2</p>
                            </div>
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 card-hover-effect">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Administradores</p>
                                <p className="text-3xl font-bold text-foreground">1</p>
                            </div>
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-6 card-hover-effect">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-muted-foreground text-sm mb-1">Usuarios Regulares</p>
                                <p className="text-3xl font-bold text-foreground">1</p>
                            </div>
                            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project Management Section */}
                <div className="mb-8">
                    {showProjectForm ? (
                        <ProjectForm
                            project={editingProject}
                            onSuccess={() => {
                                setShowProjectForm(false);
                                setEditingProject(null);
                                setRefreshProjects(prev => prev + 1);
                            }}
                            onCancel={() => {
                                setShowProjectForm(false);
                                setEditingProject(null);
                            }}
                        />
                    ) : (
                        <ProjectList
                            onAdd={() => {
                                setEditingProject(null);
                                setShowProjectForm(true);
                            }}
                            onEdit={(project: any) => {
                                setEditingProject(project);
                                setShowProjectForm(true);
                            }}
                            refreshTrigger={refreshProjects}
                        />
                    )}
                </div>

                {/* Info Panel */}
                <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-8">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Información del Sistema</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Email:</span>
                            <span className="text-foreground font-mono">{user.email}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Rol:</span>
                            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                                {user.role.name}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">ID de Usuario:</span>
                            <span className="text-foreground font-mono">{user.id}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
