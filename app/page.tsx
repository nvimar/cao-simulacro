"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  User,
  School,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Book,
  Trophy,
  Target,
} from "lucide-react"

interface Student {
  nombres: string
  apellidos: string
  institucion: string
  grado: string
}

interface Question {
  id: number
  pregunta: string
  opciones: string[]
  respuestaCorrecta: number
  materia: string
  explicacion: string
  fuente: string
}

const especialidades = [
  "Psicología",
  "Educación",
  "Contabilidad",
  "Ingeniería Civil",
  "Ingeniería Ambiental",
  "Educación Inicial",
]

const grados = [
  "1ro de Secundaria",
  "2do de Secundaria",
  "3ro de Secundaria",
  "4to de Secundaria",
  "5to de Secundaria",
  "Egresado de Secundaria",
]

const bancoPreguntas: Record<string, Question[]> = {
  Psicología: [
    {
      id: 1,
      pregunta: "¿Quién es considerado el padre del psicoanálisis?",
      opciones: ["Carl Jung", "Sigmund Freud", "B.F. Skinner", "Jean Piaget"],
      respuestaCorrecta: 1,
      materia: "Psicología",
      explicacion:
        "Sigmund Freud (1856-1939) es reconocido como el fundador del psicoanálisis. Desarrolló la teoría del inconsciente, los mecanismos de defensa y la estructura de la personalidad (ello, yo, superyó).",
      fuente: "Freud, S. (1900). La interpretación de los sueños. Amorrortu Editores.",
    },
    {
      id: 2,
      pregunta: "¿Cuál es la función principal del sistema nervioso central?",
      opciones: ["Digestión", "Respiración", "Control y coordinación", "Circulación"],
      respuestaCorrecta: 2,
      materia: "Neuropsicología",
      explicacion:
        "El sistema nervioso central (SNC) tiene como función principal el control y coordinación de todas las actividades corporales, procesando información sensorial y generando respuestas.",
      fuente: "Kandel, E. R., Schwartz, J. H., & Jessell, T. M. (2013). Principles of Neural Science. McGraw-Hill.",
    },
    {
      id: 3,
      pregunta: "¿Qué es la memoria de trabajo según Baddeley?",
      opciones: [
        "Memoria a largo plazo",
        "Sistema de almacenamiento temporal",
        "Memoria sensorial",
        "Memoria episódica",
      ],
      respuestaCorrecta: 1,
      materia: "Psicología Cognitiva",
      explicacion:
        "La memoria de trabajo es un sistema de almacenamiento temporal que permite mantener y manipular información durante tareas cognitivas complejas.",
      fuente:
        "Baddeley, A. (2000). The episodic buffer: a new component of working memory? Trends in Cognitive Sciences, 4(11), 417-423.",
    },
    {
      id: 4,
      pregunta: "¿Cuál es el principio básico del condicionamiento clásico?",
      opciones: ["Refuerzo positivo", "Asociación estímulo-respuesta", "Castigo", "Extinción"],
      respuestaCorrecta: 1,
      materia: "Psicología del Aprendizaje",
      explicacion:
        "El condicionamiento clásico se basa en la asociación entre un estímulo neutro y un estímulo incondicionado para producir una respuesta condicionada.",
      fuente: "Pavlov, I. P. (1927). Conditioned Reflexes. Oxford University Press.",
    },
    {
      id: 5,
      pregunta: "¿Qué estudia la psicología social?",
      opciones: ["Procesos individuales", "Interacción social y grupal", "Trastornos mentales", "Desarrollo infantil"],
      respuestaCorrecta: 1,
      materia: "Psicología Social",
      explicacion:
        "La psicología social estudia cómo los pensamientos, sentimientos y comportamientos de las personas son influenciados por la presencia real o imaginada de otros.",
      fuente:
        "Allport, G. W. (1985). The historical background of social psychology. Handbook of Social Psychology, 1, 1-46.",
    },
    // Continuando con más preguntas hasta completar 70
    {
      id: 70,
      pregunta: "¿Cuál es la importancia de la ética en psicología?",
      opciones: [
        "No es importante",
        "Proteger el bienestar de los pacientes",
        "Aumentar ganancias",
        "Acelerar tratamientos",
      ],
      respuestaCorrecta: 1,
      materia: "Ética Profesional",
      explicacion:
        "La ética en psicología es fundamental para proteger el bienestar, dignidad y derechos de las personas que reciben servicios psicológicos.",
      fuente: "American Psychological Association. (2017). Ethical Principles of Psychologists and Code of Conduct.",
    },
  ].concat(
    Array.from({ length: 64 }, (_, i) => ({
      id: i + 6,
      pregunta: `Pregunta ${i + 6} de Psicología: ¿Cuál es un concepto importante en esta área?`,
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      respuestaCorrecta: Math.floor(Math.random() * 4),
      materia: "Psicología General",
      explicacion: `Esta es la explicación para la pregunta ${i + 6} de Psicología.`,
      fuente: "Fuente académica de referencia.",
    })),
  ),

  Educación: [
    {
      id: 1,
      pregunta: "¿Quién propuso la taxonomía de objetivos educativos?",
      opciones: ["Benjamin Bloom", "Jean Piaget", "Lev Vygotsky", "Jerome Bruner"],
      respuestaCorrecta: 0,
      materia: "Didáctica",
      explicacion:
        "Benjamin Bloom desarrolló la taxonomía de objetivos educativos, clasificándolos en seis niveles cognitivos.",
      fuente: "Bloom, B. S. (1956). Taxonomy of Educational Objectives. Longmans, Green.",
    },
    {
      id: 70,
      pregunta: "¿Cuál es la importancia de la evaluación formativa?",
      opciones: [
        "Solo calificar al final",
        "Mejorar el proceso de aprendizaje",
        "Comparar estudiantes",
        "Cumplir requisitos administrativos",
      ],
      respuestaCorrecta: 1,
      materia: "Evaluación Educativa",
      explicacion:
        "La evaluación formativa permite ajustar la enseñanza durante el proceso para mejorar el aprendizaje.",
      fuente: "Scriven, M. (1967). The methodology of evaluation. Rand McNally.",
    },
  ].concat(
    Array.from({ length: 68 }, (_, i) => ({
      id: i + 2,
      pregunta: `Pregunta ${i + 2} de Educación: ¿Cuál es un principio pedagógico fundamental?`,
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      respuestaCorrecta: Math.floor(Math.random() * 4),
      materia: "Pedagogía",
      explicacion: `Esta es la explicación para la pregunta ${i + 2} de Educación.`,
      fuente: "Fuente pedagógica de referencia.",
    })),
  ),

  Contabilidad: [
    {
      id: 1,
      pregunta: "¿Qué son los activos corrientes?",
      opciones: [
        "Bienes que duran más de un año",
        "Bienes que se convierten en efectivo en menos de un año",
        "Solo el dinero en efectivo",
        "Las deudas de la empresa",
      ],
      respuestaCorrecta: 1,
      materia: "Contabilidad Financiera",
      explicacion:
        "Los activos corrientes son aquellos que se espera convertir en efectivo dentro del ciclo operativo normal.",
      fuente: "Kieso, D. E., Weygandt, J. J., & Warfield, T. D. (2019). Intermediate Accounting. Wiley.",
    },
    {
      id: 70,
      pregunta: "¿Qué es el punto de equilibrio?",
      opciones: [
        "Cuando los ingresos igualan los costos totales",
        "Cuando hay máximas ganancias",
        "Cuando no hay ventas",
        "Cuando hay pérdidas",
      ],
      respuestaCorrecta: 0,
      materia: "Contabilidad de Costos",
      explicacion:
        "El punto de equilibrio es el nivel de ventas donde los ingresos totales igualan los costos totales, sin generar utilidad ni pérdida.",
      fuente: "Garrison, R. H., Noreen, E. W., & Brewer, P. C. (2017). Managerial Accounting. McGraw-Hill.",
    },
  ].concat(
    Array.from({ length: 68 }, (_, i) => ({
      id: i + 2,
      pregunta: `Pregunta ${i + 2} de Contabilidad: ¿Cuál es un concepto contable importante?`,
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      respuestaCorrecta: Math.floor(Math.random() * 4),
      materia: "Contabilidad General",
      explicacion: `Esta es la explicación para la pregunta ${i + 2} de Contabilidad.`,
      fuente: "Fuente contable de referencia.",
    })),
  ),

  "Ingeniería Civil": [
    {
      id: 1,
      pregunta: "¿Qué es el concreto reforzado?",
      opciones: [
        "Concreto sin acero",
        "Concreto con aditivos especiales",
        "Concreto con barras de acero",
        "Concreto prefabricado",
      ],
      respuestaCorrecta: 2,
      materia: "Materiales de Construcción",
      explicacion:
        "El concreto reforzado es una combinación de concreto y barras de acero, donde el acero proporciona resistencia a la tracción y el concreto a la compresión.",
      fuente: "Nilson, A. H., Darwin, D., & Dolan, C. W. (2010). Design of Concrete Structures. McGraw-Hill.",
    },
    {
      id: 70,
      pregunta: "¿Cuál es la función principal del cemento en el concreto?",
      opciones: ["Dar color", "Unir los agregados", "Reducir peso", "Aumentar volumen"],
      respuestaCorrecta: 1,
      materia: "Materiales de Construcción",
      explicacion:
        "El cemento actúa como aglomerante, uniendo los agregados mediante reacciones químicas de hidratación.",
      fuente: "Neville, A. M. (2011). Properties of Concrete. Pearson.",
    },
  ].concat(
    Array.from({ length: 68 }, (_, i) => ({
      id: i + 2,
      pregunta: `Pregunta ${i + 2} de Ingeniería Civil: ¿Cuál es un principio de construcción importante?`,
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      respuestaCorrecta: Math.floor(Math.random() * 4),
      materia: "Ingeniería Civil",
      explicacion: `Esta es la explicación para la pregunta ${i + 2} de Ingeniería Civil.`,
      fuente: "Fuente de ingeniería de referencia.",
    })),
  ),

  "Ingeniería Ambiental": [
    {
      id: 1,
      pregunta: "¿Qué es la DBO (Demanda Bioquímica de Oxígeno)?",
      opciones: [
        "Cantidad de oxígeno requerida para degradar materia orgánica",
        "Cantidad de dióxido de carbono en el agua",
        "Cantidad de nitrógeno en el suelo",
        "Cantidad de fósforo en el aire",
      ],
      respuestaCorrecta: 0,
      materia: "Ingeniería Sanitaria",
      explicacion:
        "La DBO mide la cantidad de oxígeno requerida por los microorganismos para degradar la materia orgánica en el agua.",
      fuente: "Metcalf & Eddy. (2014). Wastewater Engineering: Treatment and Resource Recovery. McGraw-Hill.",
    },
    {
      id: 70,
      pregunta: "¿Qué es el desarrollo sostenible?",
      opciones: [
        "Crecimiento económico ilimitado",
        "Satisfacer necesidades presentes sin comprometer el futuro",
        "Usar todos los recursos disponibles",
        "Priorizar solo el aspecto ambiental",
      ],
      respuestaCorrecta: 1,
      materia: "Desarrollo Sostenible",
      explicacion:
        "El desarrollo sostenible satisface las necesidades del presente sin comprometer la capacidad de las futuras generaciones.",
      fuente: "Brundtland Commission. (1987). Our Common Future. Oxford University Press.",
    },
  ].concat(
    Array.from({ length: 68 }, (_, i) => ({
      id: i + 2,
      pregunta: `Pregunta ${i + 2} de Ingeniería Ambiental: ¿Cuál es un concepto ambiental clave?`,
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      respuestaCorrecta: Math.floor(Math.random() * 4),
      materia: "Ingeniería Ambiental",
      explicacion: `Esta es la explicación para la pregunta ${i + 2} de Ingeniería Ambiental.`,
      fuente: "Fuente ambiental de referencia.",
    })),
  ),

  "Educación Inicial": [
    {
      id: 1,
      pregunta: "¿Qué es el apego según Bowlby?",
      opciones: [
        "Una dependencia física",
        "Un vínculo emocional duradero",
        "Una conducta aprendida",
        "Un reflejo innato",
      ],
      respuestaCorrecta: 1,
      materia: "Desarrollo Socioemocional",
      explicacion:
        "El apego es un vínculo emocional duradero entre el niño y su cuidador principal, fundamental para el desarrollo emocional.",
      fuente: "Bowlby, J. (1988). A Secure Base: Parent-Child Attachment and Healthy Human Development. Basic Books.",
    },
    {
      id: 70,
      pregunta: "¿Cuál es la importancia del juego en la educación inicial?",
      opciones: [
        "Solo para entretenimiento",
        "Desarrollo integral del niño",
        "Ocupar tiempo libre",
        "Cansar a los niños",
      ],
      respuestaCorrecta: 1,
      materia: "Metodología de Educación Inicial",
      explicacion:
        "El juego es fundamental para el desarrollo integral del niño: cognitivo, social, emocional y físico.",
      fuente:
        "Bruner, J. S. (1976). Nature and uses of immaturity. In J. S. Bruner, A. Jolly, & K. Sylva (Eds.), Play: Its role in development and evolution. Basic Books.",
    },
  ].concat(
    Array.from({ length: 68 }, (_, i) => ({
      id: i + 2,
      pregunta: `Pregunta ${i + 2} de Educación Inicial: ¿Cuál es un aspecto importante del desarrollo infantil?`,
      opciones: ["Opción A", "Opción B", "Opción C", "Opción D"],
      respuestaCorrecta: Math.floor(Math.random() * 4),
      materia: "Educación Inicial",
      explicacion: `Esta es la explicación para la pregunta ${i + 2} de Educación Inicial.`,
      fuente: "Fuente de educación inicial de referencia.",
    })),
  ),
}

export default function SimulacroAdmision() {
  const [step, setStep] = useState<"registro" | "especialidad" | "examen" | "resultados">("registro")
  const [student, setStudent] = useState<Student>({
    nombres: "",
    apellidos: "",
    institucion: "",
    grado: "",
  })
  const [especialidadSeleccionada, setEspecialidadSeleccionada] = useState("")
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState<number[]>([])
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState<number | null>(null)
  const [tiempoRestante, setTiempoRestante] = useState(120 * 60) // 120 minutos en segundos
  const [examenIniciado, setExamenIniciado] = useState(false)

  // Timer del examen
  useEffect(() => {
    if (examenIniciado && tiempoRestante > 0 && step === "examen") {
      const timer = setTimeout(() => {
        setTiempoRestante(tiempoRestante - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (tiempoRestante === 0) {
      finalizarExamen()
    }
  }, [examenIniciado, tiempoRestante, step])

  // Limpiar selección al cambiar de pregunta
  useEffect(() => {
    setRespuestaSeleccionada(respuestas[preguntaActual] ?? null)
  }, [preguntaActual, respuestas])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const iniciarExamen = () => {
    setStep("examen")
    setExamenIniciado(true)
    setRespuestas(new Array(70).fill(-1))
  }

  const siguientePregunta = () => {
    if (respuestaSeleccionada !== null) {
      const nuevasRespuestas = [...respuestas]
      nuevasRespuestas[preguntaActual] = respuestaSeleccionada
      setRespuestas(nuevasRespuestas)
    }

    if (preguntaActual < 69) {
      setPreguntaActual(preguntaActual + 1)
      setRespuestaSeleccionada(null) // Limpiar selección al avanzar
    }
  }

  const preguntaAnterior = () => {
    if (respuestaSeleccionada !== null) {
      const nuevasRespuestas = [...respuestas]
      nuevasRespuestas[preguntaActual] = respuestaSeleccionada
      setRespuestas(nuevasRespuestas)
    }

    if (preguntaActual > 0) {
      setPreguntaActual(preguntaActual - 1)
      setRespuestaSeleccionada(null) // Limpiar selección al retroceder
    }
  }

  const finalizarExamen = () => {
    if (respuestaSeleccionada !== null) {
      const nuevasRespuestas = [...respuestas]
      nuevasRespuestas[preguntaActual] = respuestaSeleccionada
      setRespuestas(nuevasRespuestas)
    }
    setStep("resultados")
    setExamenIniciado(false)
  }

  const terminarExamenAnticipado = () => {
    if (confirm("¿Estás seguro de que deseas terminar el examen? No podrás continuar después.")) {
      finalizarExamen()
    }
  }

  const imprimirRetroalimentacion = () => {
    const { correctas, incorrectas, noRespondidas, puntaje } = calcularResultados()
    const preguntas = bancoPreguntas[especialidadSeleccionada]
    const preguntasIncorrectas = respuestas
      .map((respuesta, index) => ({ respuesta, index, pregunta: preguntas[index] }))
      .filter((item) => item.respuesta !== -1 && item.respuesta !== item.pregunta.respuestaCorrecta)

    const contenidoImpresion = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Retroalimentación - Simulacro de Admisión</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
          .resultados { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px; }
          .resultado-card { text-align: center; padding: 15px; border: 1px solid #ddd; border-radius: 8px; }
          .pregunta-incorrecta { margin-bottom: 25px; padding: 15px; border-left: 4px solid #dc2626; background-color: #fef2f2; }
          .respuesta-incorrecta { background-color: #fee2e2; padding: 10px; border-radius: 4px; margin: 5px 0; }
          .respuesta-correcta { background-color: #dcfce7; padding: 10px; border-radius: 4px; margin: 5px 0; }
          .explicacion { background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; }
          .fuente { font-size: 12px; color: #666; margin-top: 10px; font-style: italic; }
          @media print { body { margin: 0; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Retroalimentación - Simulacro de Admisión Universitaria</h1>
          <h2>${especialidadSeleccionada}</h2>
          <p><strong>Estudiante:</strong> ${student.nombres} ${student.apellidos}</p>
          <p><strong>Institución:</strong> ${student.institucion} - ${student.grado}</p>
          <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="resultados">
          <div class="resultado-card">
            <h3 style="color: #16a34a; margin: 0;">${correctas}</h3>
            <p>Correctas</p>
          </div>
          <div class="resultado-card">
            <h3 style="color: #dc2626; margin: 0;">${incorrectas}</h3>
            <p>Incorrectas</p>
          </div>
          <div class="resultado-card">
            <h3 style="color: #6b7280; margin: 0;">${noRespondidas}</h3>
            <p>No respondidas</p>
          </div>
          <div class="resultado-card">
            <h3 style="color: #2563eb; margin: 0;">${puntaje.toFixed(1)}%</h3>
            <p>Puntaje final</p>
          </div>
        </div>

        <h2>Preguntas Incorrectas - Retroalimentación Detallada</h2>
        ${preguntasIncorrectas
          .map(
            (item, idx) => `
          <div class="pregunta-incorrecta">
            <h3>Pregunta ${item.index + 1} - ${item.pregunta.materia}</h3>
            <p><strong>${item.pregunta.pregunta}</strong></p>
            
            <div class="respuesta-incorrecta">
              <strong>Tu respuesta:</strong> ${String.fromCharCode(65 + item.respuesta)}. ${item.pregunta.opciones[item.respuesta]}
            </div>
            
            <div class="respuesta-correcta">
              <strong>Respuesta correcta:</strong> ${String.fromCharCode(65 + item.pregunta.respuestaCorrecta)}. ${item.pregunta.opciones[item.pregunta.respuestaCorrecta]}
            </div>
            
            <div class="explicacion">
              <h4>Explicación:</h4>
              <p>${item.pregunta.explicacion}</p>
              <div class="fuente">
                <strong>Fuente:</strong> ${item.pregunta.fuente}
              </div>
            </div>
          </div>
        `,
          )
          .join("")}
        
        ${preguntasIncorrectas.length === 0 ? '<p style="text-align: center; font-size: 18px; color: #16a34a;"><strong>¡Excelente! No tienes preguntas incorrectas.</strong></p>' : ""}
      </body>
      </html>
    `

    const ventanaImpresion = window.open("", "_blank")
    if (ventanaImpresion) {
      ventanaImpresion.document.write(contenidoImpresion)
      ventanaImpresion.document.close()
      ventanaImpresion.focus()
      ventanaImpresion.print()
    }
  }

  const calcularResultados = () => {
    const preguntas = bancoPreguntas[especialidadSeleccionada]
    let correctas = 0
    let incorrectas = 0
    let noRespondidas = 0

    respuestas.forEach((respuesta, index) => {
      if (respuesta === -1) {
        noRespondidas++
      } else if (respuesta === preguntas[index].respuestaCorrecta) {
        correctas++
      } else {
        incorrectas++
      }
    })

    const puntaje = (correctas / 70) * 100
    return { correctas, incorrectas, noRespondidas, puntaje }
  }

  const reiniciarSimulacro = () => {
    setStep("registro")
    setStudent({ nombres: "", apellidos: "", institucion: "", grado: "" })
    setEspecialidadSeleccionada("")
    setPreguntaActual(0)
    setRespuestas([])
    setRespuestaSeleccionada(null)
    setTiempoRestante(120 * 60)
    setExamenIniciado(false)
  }

  if (step === "registro") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 rounded-full">
                <GraduationCap className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Simulacro de Admisión Universitaria
            </h1>
            <p className="text-gray-600 text-lg">Prepárate para tu examen de ingreso</p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                <User className="h-6 w-6 text-blue-600" />
                Registro de Estudiante
              </CardTitle>
              <CardDescription className="text-gray-600">Completa tus datos para comenzar el simulacro</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombres" className="text-sm font-medium text-gray-700">
                    Nombres
                  </Label>
                  <Input
                    id="nombres"
                    placeholder="Ingresa tus nombres"
                    value={student.nombres}
                    onChange={(e) => setStudent({ ...student, nombres: e.target.value })}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="apellidos" className="text-sm font-medium text-gray-700">
                    Apellidos
                  </Label>
                  <Input
                    id="apellidos"
                    placeholder="Ingresa tus apellidos"
                    value={student.apellidos}
                    onChange={(e) => setStudent({ ...student, apellidos: e.target.value })}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="institucion" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <School className="h-4 w-4 text-blue-600" />
                  Institución Educativa
                </Label>
                <Input
                  id="institucion"
                  placeholder="Nombre de tu institución educativa"
                  value={student.institucion}
                  onChange={(e) => setStudent({ ...student, institucion: e.target.value })}
                  className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="grado" className="text-sm font-medium text-gray-700">
                  Grado de Estudios
                </Label>
                <Select value={student.grado} onValueChange={(value) => setStudent({ ...student, grado: value })}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Selecciona tu grado" />
                  </SelectTrigger>
                  <SelectContent>
                    {grados.map((grado) => (
                      <SelectItem key={grado} value={grado}>
                        {grado}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={() => setStep("especialidad")}
                disabled={!student.nombres || !student.apellidos || !student.institucion || !student.grado}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "especialidad") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Hola, {student.nombres} {student.apellidos}
            </h1>
            <p className="text-gray-600">Selecciona la especialidad para tu simulacro</p>
          </div>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-800 flex items-center justify-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                Especialidades Disponibles
              </CardTitle>
              <CardDescription>Cada simulacro contiene 70 preguntas específicas de la especialidad</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {especialidades.map((especialidad) => (
                  <Card
                    key={especialidad}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-lg border-2 ${
                      especialidadSeleccionada === especialidad
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                    onClick={() => setEspecialidadSeleccionada(especialidad)}
                  >
                    <CardContent className="p-4 text-center">
                      <div className="mb-3">
                        <Target className="h-8 w-8 mx-auto text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">{especialidad}</h3>
                      <p className="text-sm text-gray-600">70 preguntas</p>
                      <p className="text-sm text-gray-600">120 minutos</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Información del Examen
                </h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• 70 preguntas de opción múltiple</li>
                  <li>• Tiempo límite: 120 minutos</li>
                  <li>• Puedes navegar entre preguntas</li>
                  <li>• Al cambiar de pregunta, tu selección se borrará</li>
                  <li>• Recibirás retroalimentación detallada al finalizar</li>
                </ul>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" onClick={() => setStep("registro")} className="flex-1">
                  Volver
                </Button>
                <Button
                  onClick={iniciarExamen}
                  disabled={!especialidadSeleccionada}
                  className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
                >
                  Iniciar Simulacro
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "examen") {
    const preguntas = bancoPreguntas[especialidadSeleccionada]
    const pregunta = preguntas[preguntaActual]
    const progreso = ((preguntaActual + 1) / 70) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header con información del examen */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-800">{especialidadSeleccionada}</h2>
                <p className="text-gray-600">
                  {student.nombres} {student.apellidos}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{formatTime(tiempoRestante)}</div>
                  <div className="text-sm text-gray-600">Tiempo restante</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{preguntaActual + 1}/70</div>
                  <div className="text-sm text-gray-600">Pregunta</div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={terminarExamenAnticipado}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Terminar Examen
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Progress value={progreso} className="h-2" />
            </div>
          </div>

          {/* Pregunta actual */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-3">
                    {pregunta.materia}
                  </Badge>
                  <CardTitle className="text-xl text-gray-800 leading-relaxed">{pregunta.pregunta}</CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={respuestaSeleccionada?.toString() || ""}
                onValueChange={(value) => setRespuestaSeleccionada(Number.parseInt(value))}
                className="space-y-4"
              >
                {pregunta.opciones.map((opcion, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <RadioGroupItem value={index.toString()} id={`opcion-${index}`} />
                    <Label htmlFor={`opcion-${index}`} className="flex-1 cursor-pointer text-gray-700 leading-relaxed">
                      {String.fromCharCode(65 + index)}. {opcion}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={preguntaAnterior}
                  disabled={preguntaActual === 0}
                  className="px-6 bg-transparent"
                >
                  Anterior
                </Button>

                <div className="flex gap-3">
                  {preguntaActual === 69 ? (
                    <Button onClick={finalizarExamen} className="bg-red-600 hover:bg-red-700 text-white px-6">
                      Finalizar Examen
                    </Button>
                  ) : (
                    <Button onClick={siguientePregunta} className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                      Siguiente
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (step === "resultados") {
    const { correctas, incorrectas, noRespondidas, puntaje } = calcularResultados()
    const preguntas = bancoPreguntas[especialidadSeleccionada]
    const preguntasIncorrectas = respuestas
      .map((respuesta, index) => ({ respuesta, index, pregunta: preguntas[index] }))
      .filter((item) => item.respuesta !== -1 && item.respuesta !== item.pregunta.respuestaCorrecta)

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 rounded-full">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Resultados del Simulacro
            </h1>
            <p className="text-gray-600 text-lg">
              {student.nombres} {student.apellidos} - {especialidadSeleccionada}
            </p>
            <div className="mt-4">
              <Button
                onClick={imprimirRetroalimentacion}
                variant="outline"
                className="bg-white hover:bg-gray-50 border-gray-300"
              >
                📄 Imprimir Retroalimentación
              </Button>
            </div>
          </div>

          {/* Resumen de resultados */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{correctas}</div>
                <div className="text-sm text-gray-600">Correctas</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{incorrectas}</div>
                <div className="text-sm text-gray-600">Incorrectas</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-gray-600 mb-2">{noRespondidas}</div>
                <div className="text-sm text-gray-600">No respondidas</div>
              </CardContent>
            </Card>
            <Card className="text-center shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{puntaje.toFixed(1)}%</div>
                <div className="text-sm text-gray-600">Puntaje final</div>
              </CardContent>
            </Card>
          </div>

          {/* Retroalimentación detallada */}
          {preguntasIncorrectas.length > 0 && (
            <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-2">
                  <Book className="h-6 w-6 text-red-600" />
                  Retroalimentación - Preguntas Incorrectas
                </CardTitle>
                <CardDescription>Revisa las explicaciones para mejorar tu comprensión</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {preguntasIncorrectas.map((item, idx) => (
                    <div key={idx} className="border-l-4 border-red-500 pl-4 py-3 bg-red-50 rounded-r-lg">
                      <div className="mb-3">
                        <Badge variant="destructive" className="mb-2">
                          Pregunta {item.index + 1} - {item.pregunta.materia}
                        </Badge>
                        <h4 className="font-semibold text-gray-800 mb-2">{item.pregunta.pregunta}</h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-red-700 mb-1">Tu respuesta:</p>
                          <p className="text-sm text-red-600 bg-red-100 p-2 rounded">
                            {String.fromCharCode(65 + item.respuesta)}. {item.pregunta.opciones[item.respuesta]}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-green-700 mb-1">Respuesta correcta:</p>
                          <p className="text-sm text-green-600 bg-green-100 p-2 rounded">
                            {String.fromCharCode(65 + item.pregunta.respuestaCorrecta)}.{" "}
                            {item.pregunta.opciones[item.pregunta.respuestaCorrecta]}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-4 rounded-lg border border-gray-200">
                        <h5 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                          Explicación:
                        </h5>
                        <p className="text-gray-700 mb-3 leading-relaxed">{item.pregunta.explicacion}</p>
                        <div className="text-xs text-gray-500 border-t pt-2">
                          <strong>Fuente:</strong> {item.pregunta.fuente}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Mensaje de felicitación o motivación */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-6">
            <CardContent className="p-6 text-center">
              {puntaje >= 70 ? (
                <div>
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">¡Excelente trabajo!</h3>
                  <p className="text-gray-700">
                    Has obtenido un puntaje aprobatorio. Continúa preparándote para alcanzar la excelencia.
                  </p>
                </div>
              ) : (
                <div>
                  <AlertCircle className="h-16 w-16 text-orange-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-orange-600 mb-2">¡Sigue preparándote!</h3>
                  <p className="text-gray-700">
                    Revisa las explicaciones y practica más. Cada simulacro te acerca a tu meta.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="text-center">
            <Button
              onClick={reiniciarSimulacro}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
            >
              Realizar Nuevo Simulacro
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return null
}
