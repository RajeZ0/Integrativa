"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ChevronDown,
  Star,
  Users,
  Target,
  Heart,
  Shield,
  Handshake,
  Trophy,
  Lightbulb,
  Gift,
  ArrowRight,
  Play,
  Gamepad2,
  Zap,
  Rocket,
} from "lucide-react"
import api from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function MeztliOcelotlPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [projects, setProjects] = useState<any[]>([])
  const { isAuthenticated, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)

    api.get('/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.error('Error loading projects:', err))

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const values = [
    { icon: Shield, title: "Honestidad", description: "La verdad y la transparencia nos definen." },
    { icon: Handshake, title: "Lealtad", description: "Una hermandad que se apoya mutuamente." },
    { icon: Heart, title: "Respeto", description: "Cada persona es valiosa en nuestro equipo." },
    { icon: Users, title: "Unidad", description: "Somos una fuerza conjunta." },
    { icon: Trophy, title: "Perseverancia", description: "Los sueños requieren compromiso." },
    { icon: Gift, title: "Generosidad", description: "Medimos éxito por lo que compartimos." },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* ... (background effects remain same) */}

      <nav className="fixed top-0 w-full bg-background/90 backdrop-blur-xl z-50 border-b border-primary/20 animate-electric-border">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img src="/logo-meztli-ocelotl.svg" alt="Meztli Ocelotl" className="h-10 w-10" />
                <div className="absolute inset-0 animate-pulse-glow rounded-full" />
              </div>
              <span className="font-bold text-xl text-foreground tracking-tight animate-neon-glow">Meztli Ocelotl</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#inicio" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-semibold hover:scale-110">Inicio</a>
              <a href="#nosotros" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-semibold hover:scale-110">Nosotros</a>
              <a href="#proyectos" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-semibold hover:scale-110">Proyectos</a>
              <a href="#valores" className="text-muted-foreground hover:text-primary transition-all duration-300 text-sm font-semibold hover:scale-110">Valores</a>
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(user?.role.slug === 'admin' ? '/admin' : '/dashboard')}
                  className="border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent hover:scale-110 transition-all duration-300 animate-glow-pulse"
                >
                  Ir al Dashboard
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push('/login')}
                  className="border-primary/50 hover:bg-primary hover:text-primary-foreground bg-transparent hover:scale-110 transition-all duration-300 animate-glow-pulse"
                >
                  Iniciar Sesión
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ... (Inicio and Nosotros sections remain same) */}
      <section id="inicio" className="pt-32 pb-20 px-6 relative">
        {/* ... content of inicio ... */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-64 h-64 border border-primary/10 rounded-full animate-hologram" />
          <div className="absolute bottom-20 left-10 w-48 h-48 border-2 border-secondary/20 rotate-45 animate-bounce-subtle" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-primary/5 rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[85vh]">
            <div className={`space-y-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
              <div className="space-y-8">
                <div className="inline-flex items-center space-x-3 bg-card/50 px-6 py-3 rounded-full border border-primary/30 backdrop-blur-sm animate-electric-border">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                  <span className="text-sm font-bold text-foreground">Hecho en México</span>
                  <Gamepad2 className="w-4 h-4 text-secondary" />
                </div>

                <div className="space-y-8">
                  <h1 className="font-black text-7xl lg:text-9xl text-foreground leading-[0.85] tracking-tighter animate-neon-glow">
                    SUEÑOS
                    <br />
                    <span className="text-primary animate-pulse">SIN LÍMITES</span>
                  </h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-primary to-secondary animate-shimmer" />
                </div>

                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg font-medium">
                  Una comunidad de <span className="text-secondary font-bold">creadores</span> que demuestra que no hay
                  límites cuando la
                  <span className="text-primary font-bold"> disciplina, pasión y perseverancia</span> guían el camino.
                </p>
              </div>

              <div className="flex items-center space-x-6">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 py-6 text-lg font-bold hover:scale-110 transition-all duration-300 animate-glow-pulse"
                >
                  <Play className="w-5 h-5 mr-3" />
                  EXPLORAR
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  className="text-muted-foreground hover:text-secondary px-8 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300"
                >
                  Nuestra historia
                  <ArrowRight className="w-5 h-5 ml-3" />
                </Button>
              </div>

              <div className="flex items-center space-x-16 pt-12 border-t border-primary/20">
                <div className="text-center">
                  <div className="font-black text-4xl text-primary animate-neon-glow">2025</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Fundada</div>
                </div>
                <div className="text-center">
                  <div className="font-black text-4xl text-secondary">∞</div>
                  <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Posibilidades</div>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 text-primary mx-auto animate-bounce-subtle" />
                  <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Energía</div>
                </div>
              </div>
            </div>

            <div
              className={`relative flex items-center justify-center ${isVisible ? "animate-scale-in" : "opacity-0"}`}
            >
              <div className="relative">
                <div className="absolute inset-0 -m-32">
                  <div className="absolute top-0 right-0 w-40 h-40 border-2 border-primary/30 rounded-full animate-hologram" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 border-2 border-secondary/40 rotate-45 animate-bounce-subtle" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-primary/10 rounded-full animate-pulse" />
                  <Rocket className="absolute top-10 left-10 w-6 h-6 text-secondary/60 animate-float" />
                  <Star className="absolute bottom-10 right-10 w-8 h-8 text-primary/40 animate-bounce-subtle" />
                </div>

                <div className="relative z-10 p-8 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm animate-pulse-glow">
                  <img
                    src="/logo-meztli-ocelotl.svg"
                    alt="Jaguar escalando hacia la luna"
                    className="w-full max-w-lg mx-auto animate-float relative z-10"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-radial from-primary/20 via-secondary/10 to-transparent rounded-full blur-3xl animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-24">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-primary to-secondary" />
            <ChevronDown className="w-6 h-6 text-primary animate-bounce" />
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mb-6 mx-auto animate-shimmer" />
              <h2 className="font-black text-5xl lg:text-7xl text-foreground leading-tight tracking-tighter animate-neon-glow">
                EL JAGUAR QUE
                <br />
                <span className="text-primary">ESCALA HACIA LA LUNA</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Un símbolo de <span className="text-secondary font-bold">lucha, perseverancia</span> y sueños
              inquebrantables que representa la esencia del
              <span className="text-primary font-bold"> guerrero ancestral</span>.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <Card className="p-10 border-2 border-primary/30 backdrop-blur-sm hover:bg-card/80 transition-all duration-700 group hover:scale-105 hover:shadow-2xl card-hover-effect bg-gradient-to-br from-card to-card/50 animate-electric-border">
              <CardContent className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/40 transition-all duration-500 group-hover:scale-125 animate-glow-pulse">
                    <Target className="w-6 h-6 text-primary group-hover:animate-bounce-subtle" />
                  </div>
                  <h3 className="font-black text-2xl text-foreground group-hover:text-primary transition-colors animate-neon-glow">
                    MISIÓN
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg group-hover:text-foreground/90 transition-colors">
                  Crear videojuegos <span className="text-secondary font-bold">innovadores</span> de impacto global,
                  representando a<span className="text-primary font-bold"> México con orgullo</span> en la industria del
                  entretenimiento digital.
                </p>
              </CardContent>
            </Card>

            <Card className="p-10 border-2 border-secondary/30 backdrop-blur-sm hover:bg-card/80 transition-all duration-700 group hover:scale-105 hover:shadow-2xl card-hover-effect bg-gradient-to-br from-card to-card/50 animate-electric-border">
              <CardContent className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center group-hover:bg-secondary/40 transition-all duration-500 group-hover:scale-125 animate-glow-pulse">
                    <Star className="w-6 h-6 text-secondary group-hover:animate-bounce-subtle" />
                  </div>
                  <h3 className="font-black text-2xl text-foreground group-hover:text-secondary transition-colors animate-neon-glow">
                    VISIÓN
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed font-medium text-lg group-hover:text-foreground/90 transition-colors">
                  Ser <span className="text-primary font-bold">líderes mundiales</span> en desarrollo de videojuegos,
                  llevando el nombre de
                  <span className="text-secondary font-bold"> México</span> a lo más alto de la industria.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-32 px-6 relative bg-gradient-to-b from-background to-card/30">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mb-6 mx-auto animate-shimmer" />
              <h2 className="font-black text-5xl lg:text-7xl text-foreground leading-tight tracking-tighter animate-neon-glow">
                NUESTROS
                <br />
                <span className="text-primary">PROYECTOS</span>
              </h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-medium">
              Explora nuestras creaciones, donde la <span className="text-secondary font-bold">imaginación</span> cobra vida.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.id}
                className="overflow-hidden border-2 border-primary/20 backdrop-blur-sm hover:bg-card/80 transition-all duration-700 group hover:-translate-y-4 hover:scale-105 hover:shadow-2xl animate-fade-in-up card-hover-effect bg-gradient-to-br from-card to-card/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  {project.image_path ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}${project.image_path}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
                      <Gamepad2 className="w-12 h-12 opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full bg-primary hover:bg-primary/90">Ver Detalles</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] bg-card text-foreground border-border">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold">{project.title}</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            {project.is_active ? 'Proyecto Activo' : 'Proyecto Inactivo'}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                          {project.image_path && (
                            <div className="relative h-64 w-full overflow-hidden rounded-lg">
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'}${project.image_path}`}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-semibold mb-2 text-lg">Historia / Descripción</h4>
                              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between pt-4 border-t border-border">
                              <span className="font-semibold">Precio de lanzamiento</span>
                              <span className="text-2xl font-bold text-primary">${project.price}</span>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-black text-xl text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-bold">
                      ${project.price}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {project.description}
                  </p>
                </CardContent>
              </Card>
            ))}

            {projects.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">Próximamente nuevos proyectos...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="valores" className="py-32 px-6 bg-gradient-to-br from-card/30 to-background relative">
        {/* ... content of valores ... */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-primary/30 rotate-45 animate-hologram" />
          <div className="absolute top-20 right-20 w-16 h-16 border border-secondary/30 rounded-full animate-bounce-subtle" />
          <div className="absolute bottom-20 left-20 w-24 h-24 border border-primary/20 animate-pulse" />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-24">
            <div className="inline-block mb-8">
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary mb-6 mx-auto animate-shimmer" />
              <h2 className="font-black text-5xl lg:text-7xl text-foreground leading-tight tracking-tighter animate-neon-glow">
                NUESTROS
                <br />
                <span className="text-secondary">VALORES</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 border-2 border-primary/20 backdrop-blur-sm hover:bg-card/80 transition-all duration-700 group hover:-translate-y-4 hover:scale-105 hover:shadow-2xl animate-fade-in-up card-hover-effect bg-gradient-to-br from-card to-card/50 hover:border-secondary/50"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="space-y-6">
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center group-hover:bg-secondary/25 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12 animate-glow-pulse">
                    <value.icon className="w-7 h-7 text-primary group-hover:text-secondary group-hover:animate-bounce-subtle transition-colors duration-300" />
                  </div>
                  <h3 className="font-black text-xl text-foreground group-hover:text-secondary transition-colors animate-neon-glow">
                    {value.title.toUpperCase()}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed font-medium group-hover:text-foreground/90 transition-colors">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="vision" className="py-32 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10" />

        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="space-y-16">
            <div className="space-y-12">
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto animate-shimmer" />
              <blockquote className="font-black text-4xl lg:text-6xl text-foreground leading-tight tracking-tighter animate-neon-glow">
                "EL BIEN SIEMPRE GANA, SIEMPRE Y CUANDO
                <br />
                <span className="text-primary">LOS BUENOS HAGAN ALGO AL RESPECTO"</span>
              </blockquote>
            </div>

            <p className="text-xl text-muted-foreground leading-relaxed font-medium max-w-3xl mx-auto">
              No solo <span className="text-secondary font-bold">soñamos en grande</span>, vivimos con grandeza. Cada
              día trabajamos para
              <span className="text-primary font-bold"> cambiar el mundo</span> a través de nuestros videojuegos.
            </p>

            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90 px-12 py-6 text-lg font-bold hover:scale-110 transition-all duration-300 animate-glow-pulse"
            >
              <Lightbulb className="w-5 h-5 mr-3" />
              ÚNETE A NUESTRA MISIÓN
            </Button>
          </div>
        </div>
      </section>

      <footer className="py-20 px-6 border-t-2 border-primary/20 bg-gradient-to-br from-card/50 to-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0">
            <div className="flex items-center space-x-6">
              <img src="/logo-meztli-ocelotl.svg" alt="Meztli Ocelotl" className="h-8 w-8 opacity-80 animate-float" />
              <span className="font-black text-xl text-foreground animate-neon-glow">MEZTLI OCELOTL</span>
            </div>
            <div className="text-center md:text-right space-y-2">
              <a href="mailto:tlatoani@meztliocelotl.com" className="text-primary font-bold hover:underline block mb-2">
                tlatoani@meztliocelotl.com
              </a>
              <p className="text-muted-foreground font-semibold">
                © 2024 Meztli Ocelotl. <span className="text-primary">Hecho en México</span> para el mundo.
              </p>
              <p className="text-muted-foreground text-sm opacity-80 font-medium">
                "Escalando hacia la luna, un sueño a la vez"
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
