import { useState, type FormEvent } from 'react'
import { Button } from '@/components/Button'
import { FormField, TextInput } from '@/components/FormField'
import { Modal } from '@/components/Modal'
import { useBusinessOrder } from '@/pages/b2b/shared'

interface SaveListModalProps {
  isOpen: boolean
  onClose: () => void
}

/** Pede um nome e salva o pedido atual como lista para recompra. Compõe o Modal base. */
export function SaveListModal({ isOpen, onClose }: SaveListModalProps) {
  const { saveList } = useBusinessOrder()
  const [name, setName] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    saveList(name.trim())
    setName('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      ariaLabel="Salvar pedido como lista"
      containerClassName="absolute left-1/2 top-1/2 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2"
    >
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 rounded-2xl bg-bone-50 p-8 shadow-2xl"
      >
        <div>
          <h2 className="text-2xl">Salvar como lista</h2>
          <p className="mt-2 text-sm text-ink-700">
            Repita este pedido depois, ajustando só as quantidades.
          </p>
        </div>
        <FormField label="Nome da lista" htmlFor="listName">
          <TextInput
            id="listName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex.: Pedido de segunda"
          />
        </FormField>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" disabled={!name.trim()}>
            Salvar lista
          </Button>
        </div>
      </form>
    </Modal>
  )
}
