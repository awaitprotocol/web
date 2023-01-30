/* eslint-disable no-unused-vars */
import { ensName } from "@/shared/consts"
import React, { useEffect, useState } from "react"
import { Modal } from "react-daisyui"

type Props = {
  showSetting: boolean
  setShowSetting: (value: boolean) => void
}

export default function SettingModal({ showSetting, setShowSetting }: Props) {
  const [formValue, setFormValue] = useState("direct")

  useEffect(() => {
    const localData = localStorage.getItem(ensName)
    if (localData) {
      setFormValue(localData)
    }
  }, [formValue])

  const handleSubmit = () => {
    localStorage.setItem(ensName, formValue as string)
    setShowSetting(false)
  }

  return (
    <>
      <Modal open={showSetting}>
        <Modal.Header className="font-bold">ENS gateway</Modal.Header>
        <hr />
        <Modal.Body>
          <form onSubmit={handleSubmit} className="select-ens">
            <div>Choose the ENS</div>
            <select onChange={(e) => setFormValue(e.target.value)} className="select-input">
              <option value="direct">direct</option>
              <option value="eth.link">eth.link</option>
              <option value="eth.limo">eth.limo</option>
            </select>
          </form>
        </Modal.Body>
        <Modal.Actions>
          <div className="btn" onClick={() => setShowSetting(false)}>
            Close
          </div>
          <div className="btn my-btn" onClick={() => handleSubmit()}>
            Save Changes
          </div>
        </Modal.Actions>
      </Modal>
    </>
  )
}
