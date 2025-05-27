// Utilidades para manejo seguro de strings
export const safeStringUtils = {
  // Conversión segura a minúsculas
  toLowerCase: (str: unknown): string => {
    try {
      if (str == null) return ""
      if (typeof str !== "string") return String(str).toLowerCase()
      return str.toLowerCase()
    } catch (error) {
      console.warn("Error en toLowerCase:", error, str)
      return String(str || "")
    }
  },

  // Conversión segura a mayúsculas
  toUpperCase: (str: unknown): string => {
    try {
      if (str == null) return ""
      if (typeof str !== "string") return String(str).toUpperCase()
      return str.toUpperCase()
    } catch (error) {
      console.warn("Error en toUpperCase:", error, str)
      return String(str || "")
    }
  },

  // Trim seguro
  safeTrim: (str: unknown): string => {
    try {
      if (str == null) return ""
      if (typeof str !== "string") return String(str).trim()
      return str.trim()
    } catch (error) {
      console.warn("Error en safeTrim:", error, str)
      return String(str || "")
    }
  },

  // Verificar si es string válido
  isValidString: (str: unknown): str is string => {
    return typeof str === "string" && str.length > 0
  },

  // Obtener primer carácter de forma segura
  getFirstChar: (str: unknown): string => {
    try {
      if (!safeStringUtils.isValidString(str)) return ""
      return str.charAt(0)
    } catch (error) {
      console.warn("Error en getFirstChar:", error, str)
      return ""
    }
  },

  // Validar que dos strings coincidan (case insensitive)
  safeEquals: (str1: unknown, str2: unknown): boolean => {
    try {
      const safe1 = safeStringUtils.toLowerCase(str1)
      const safe2 = safeStringUtils.toLowerCase(str2)
      return safe1 === safe2
    } catch (error) {
      console.warn("Error en safeEquals:", error, { str1, str2 })
      return false
    }
  },
}

// Hook personalizado para debugging
export const useDebugLog = (componentName: string) => {
  return (message: string, data?: any) => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[${componentName}] ${message}`, data)
    }
  }
}

// Función para validar props de componentes
export const validateProps = (props: Record<string, any>, requiredProps: string[], componentName: string) => {
  const missing = requiredProps.filter((prop) => props[prop] == null)
  if (missing.length > 0) {
    console.error(`[${componentName}] Props faltantes:`, missing)
    return false
  }
  return true
}
