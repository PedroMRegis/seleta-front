/**
 * Footer global. Sóbrio: wordmark, uma linha sobre a casa, colunas de navegação
 * (ainda placeholders — sem href real, pois não há rotas configuradas) e um bloco
 * de contato também como placeholder, já que os dados reais de atendimento ainda
 * não foram definidos.
 */
export function Footer() {
  const columns = [
    { title: 'Loja', items: ['Peixes', 'Carnes', 'Ofertas da semana'] },
    { title: 'Institucional', items: ['Sobre a Seleta', 'Nossas lojas', 'Trabalhe conosco'] },
    { title: 'Atendimento', items: ['Central de ajuda', 'Trocas e devoluções', 'Fale conosco'] },
  ]

  return (
    <footer className="bg-ink-900 text-bone-100">
      <div className="page-container page-section">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl text-bone-50">Seleta</p>
            <p className="mt-3 max-w-xs text-sm text-bone-100/70">
              Peixes e carnes selecionados todos os dias, do jeito que a sua mesa merece.
            </p>
          </div>

          {/* Colunas de navegação — ainda não são links de verdade (sem rotas
              configuradas no projeto); aria-hidden porque não fazem nada até o
              roteamento existir. Trocar por <Link> quando react-router entrar. */}
          {columns.map((column) => (
            <nav key={column.title} aria-hidden="true">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-bone-100/60">
                {column.title}
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {column.items.map((item) => (
                  <li key={item} className="text-sm text-bone-100/80">
                    {item}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Contato — placeholder (ghost bars); dados reais de atendimento ainda não definidos. */}
        <div
          className="mt-10 flex flex-col gap-2 border-t border-bone-100/10 pt-8 sm:flex-row sm:gap-6"
          aria-hidden="true"
        >
          <span className="h-3 w-40 rounded-full bg-bone-100/15" />
          <span className="h-3 w-48 rounded-full bg-bone-100/15" />
          <span className="h-3 w-56 rounded-full bg-bone-100/15" />
        </div>

        <p className="mt-8 text-xs text-bone-100/50">
          © 2026 Seleta. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
