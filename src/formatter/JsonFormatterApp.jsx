import React from 'react'
import JsonFormatter from './component/JsonFormatter'
import GeneralCustomHeader from '../component/GeneralCustomHeader'

export default function JsonFormatterApp() {
  return (
    <div>
        <GeneralCustomHeader />
        <JsonFormatter />
    </div>
  )
}
