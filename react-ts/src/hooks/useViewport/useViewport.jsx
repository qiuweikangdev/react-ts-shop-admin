import React, { useState } from 'react'
import { ViewportContext } from '@/components/craeteContext'

const useViewport = ()=>{
    const { width,height } =React.useContext(ViewportContext)
    return {
        width,
        height
    }
}
export default useViewport