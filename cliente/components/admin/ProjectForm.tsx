'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import api from '@/lib/api';

interface ProjectFormProps {
    project?: any;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: project?.title || '',
        description: project?.description || '',
        price: project?.price || '',
    });
    const [image, setImage] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('description', formData.description);
            data.append('price', formData.price);
            if (image) {
                data.append('image', image);
            }
            if (project) {
                data.append('_method', 'PUT'); // Laravel method spoofing for FormData
            }

            if (project) {
                await api.post(`/projects/${project.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } else {
                await api.post('/projects', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            }

            onSuccess();
        } catch (err: any) {
            console.error(err);
            setError('Error al guardar el proyecto. Verifica los datos.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-card/50 backdrop-blur-xl p-6 rounded-xl border border-border">
            <h3 className="text-xl font-bold text-foreground mb-4">
                {project ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h3>

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg text-sm">
                    {error}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="title">Título del Videojuego</Label>
                <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="bg-background/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Historia / Descripción</Label>
                <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    className="bg-background/50 min-h-[100px]"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="price">Precio ($)</Label>
                <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="bg-background/50"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="image">Imagen de Portada</Label>
                <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="bg-background/50"
                />
                {project?.image_path && !image && (
                    <p className="text-xs text-muted-foreground">Imagen actual: {project.image_path}</p>
                )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
                <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>
                    Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Proyecto'}
                </Button>
            </div>
        </form>
    );
}
