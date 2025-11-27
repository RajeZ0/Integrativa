'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import api from '@/lib/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

interface Project {
    id: number;
    title: string;
    description: string;
    price: string;
    image_path: string;
    is_active: boolean;
}

interface ProjectListProps {
    onEdit: (project: Project) => void;
    onAdd: () => void;
    refreshTrigger: number;
}

export default function ProjectList({ onEdit, onAdd, refreshTrigger }: ProjectListProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const response = await api.get('/projects');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [refreshTrigger]);

    const handleDelete = async (id: number) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;

        try {
            await api.delete(`/projects/${id}`);
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error al eliminar el proyecto');
        }
    };

    if (loading) return <div className="text-center py-10">Cargando proyectos...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-foreground">Proyectos Activos</h2>
                <Button onClick={onAdd} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Proyecto
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id} className="bg-card/50 backdrop-blur-xl border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all group">
                        <div className="relative h-48 overflow-hidden">
                            {project.image_path ? (
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}${project.image_path}`}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                                    Sin imagen
                                </div>
                            )}
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    onClick={() => onEdit(project)}
                                    className="h-8 w-8"
                                >
                                    <Pencil className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    onClick={() => handleDelete(project.id)}
                                    className="h-8 w-8"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-foreground line-clamp-1">{project.title}</h3>
                                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-bold">
                                    ${project.price}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                                {project.description}
                            </p>
                        </div>
                    </div>
                ))}

                {projects.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground bg-card/30 rounded-xl border border-dashed border-border">
                        No hay proyectos registrados aún.
                    </div>
                )}
            </div>
        </div>
    );
}
