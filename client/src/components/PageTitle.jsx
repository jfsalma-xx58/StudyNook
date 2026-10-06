import { useEffect } from 'react'

function PageTitle({ title }) {
  useEffect(() => {
    document.title = `StudyNook | ${title}`
  }, [title])

  return null
}

export default PageTitle