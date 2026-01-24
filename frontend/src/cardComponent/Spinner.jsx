import React from 'react'

const Spinner = () => {
    return (
        <div className="flex justify-center mt-50 items-center h-64">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-2">Loading...</p>
        </div>
    )
}

export default Spinner;