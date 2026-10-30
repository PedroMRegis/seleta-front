/** Só os dígitos de um texto. */
export function onlyDigits(text: string): string {
  return text.replace(/\D/g, '')
}

/** Máscara progressiva de CNPJ: "11222333000181" → "11.222.333/0001-81". */
export function formatCnpj(text: string): string {
  const d = onlyDigits(text).slice(0, 14)
  return d
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

/** Valida CNPJ pelos dígitos verificadores (aceita com ou sem máscara). */
export function isValidCnpj(text: string): boolean {
  const d = onlyDigits(text)
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false
  const digit = (len: number) => {
    const weights =
      len === 12 ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2] : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const sum = weights.reduce((acc, w, i) => acc + Number(d[i]) * w, 0)
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }
  return digit(12) === Number(d[12]) && digit(13) === Number(d[13])
}

/** Máscara de telefone BR: "71999998888" → "(71) 99999-8888". */
export function formatPhone(text: string): string {
  const d = onlyDigits(text).slice(0, 11)
  if (d.length <= 10) {
    return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2')
  }
  return d.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2')
}
