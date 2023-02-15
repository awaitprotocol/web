import { ensName } from "@/shared/consts"
import { Messages } from "@/shared/typesense"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { Modal } from "react-daisyui"

type Props = {
  showSetting: boolean
  setShowSetting: Dispatch<SetStateAction<boolean>>
  messages: Messages
}

export const SettingModal = ({ showSetting, setShowSetting, messages }: Props) => {
  const [formValue, setFormValue] = useState("direct")

  useEffect(() => {
    const close = (e: { keyCode: number }) => {
      if (e.keyCode === 27) {
        setShowSetting(false)
      }
    }
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [setShowSetting])

  useEffect(() => {
    const localData = localStorage.getItem(ensName)
    if (localData) {
      setFormValue(localData)
    }
  }, [])

  const handleSubmit = () => {
    localStorage.setItem(ensName, formValue)
    setShowSetting(false)
  }

  return (
    <>
      <Modal open={showSetting}>
        <Modal.Header className="font-bold">ENS {messages.gateway}</Modal.Header>
        <hr />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="select-ens">
            <div>{messages.chooseENS}</div>
            <select
              onChange={(e) => setFormValue(e.target.value)}
              value={formValue}
              className="select-input"
            >
              <option value="direct">direct</option>
              <option value="eth.link">eth.link</option>
              <option value="eth.limo">eth.limo</option>
            </select>
          </form>
        </Modal.Body>
        <Modal.Actions>
          <div className="btn" onClick={() => setShowSetting(false)}>
            {messages.close}
          </div>
          <div className="btn my-btn" onClick={() => handleSubmit()}>
            {messages.saveChanges}
          </div>
        </Modal.Actions>
      </Modal>
    </>
  )
}
