import { useState } from 'react'

const Resume = () => {
    const [isLoading, setIsLoading] = useState(true)

    return (
        <div className="min-h-[calc(100vh-5rem)] overflow-y-auto">
            <h2 className='text-center my-4'>My Resume</h2>
            <div className="container mx-auto py-4 max-w-4xl">
                <div className="w-full relative rounded-lg shadow-lg overflow-hidden bg-gray-100 mt-10">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800" />
                        </div>
                    )}
                    <object
                        data="./Resume.pdf"
                        type="application/pdf"
                        className="w-full h-[calc(100vh-12rem)]"
                        onLoad={() => setIsLoading(false)}
                    >
                        <div className="p-4 text-center">
                            <p className="text-gray-700">
                                Unable to display PDF.
                                <a
                                    href="/Resume.pdf"
                                    download
                                    className="ml-2 text-blue-600 hover:text-blue-800 underline"
                                >
                                    Download here
                                </a>
                                instead.
                            </p>
                        </div>
                    </object>
                </div>
            </div>
        </div>
    )
}

export default Resume