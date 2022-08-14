import React, { useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const AboutMarkdown = ({value}) => {
    return(
        <ReactMarkdown  children={value} remarkPlugins={[remarkGfm]} ></ReactMarkdown>
    )
    
}

export default AboutMarkdown;