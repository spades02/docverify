import UploaderManager from '@/components/UploaderManager'
import React from 'react'

const page = () => {
  return (
    <div className="container mx-auto px-4 py-12 ">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Add/Revoke Uploaders</h1>
      {<UploaderManager />}
    </div>
    </div>
  )
}

export default page