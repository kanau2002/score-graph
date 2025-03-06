import React from 'react'
import Button from '../Button'
import Divider from '../Divider'

type ModalProps = {
  isOpen: boolean
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
  disabled?: boolean
  onClose: () => void
  onSubmit: () => void
}

export default function Modal({
  isOpen,
  title,
  children,
  actions,
  onClose,
  onSubmit,
  disabled,
}: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/50">
      <div className="w-full max-w-md rounded-lg bg-white p-8">
        <h2 className="mb-4 text-2xl font-bold text-gray-800">{title}</h2>
        <div className="mt-8"></div>
        {children}
        <Divider style={{ marginTop: '40px' }} />
        {!actions && (
          <div className="flex justify-end space-x-4">
            <Button
              title="キャンセル"
              onClick={onClose}
              type="button"
              className="w-full rounded-md bg-gray-400 px-4 py-2 font-bold text-white hover:bg-gray-600"
            />
            <Button
              title="確定"
              type="submit"
              onClick={onSubmit}
              disabled={disabled}
            />
          </div>
        )}
      </div>
    </div>
  )
}
