import React, {useCallback} from 'react'
import styles from './styles.module.scss'

type DropdownProps = {
  name: string
  value: string
  options: any[]
  onChange: (e) => void
}

export const Dropdown = ({name, value, options, onChange}: DropdownProps) => {
  return (
    <div className={styles.wrapper}>
      <select className={styles.dropdown} name={name} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
