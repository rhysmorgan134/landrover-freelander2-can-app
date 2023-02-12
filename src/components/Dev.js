import React, {useEffect} from 'react'


const Dev = function({socket}) {

    useEffect(() => {
        socket.emit('hello from client')
    }, [])

    const parseFile = (e) => {
        e.preventDefault()
        const reader = new FileReader()
        reader.onload = async (e) => {
            const text = (e.target.result)
            console.log("emitting text")
            socket.emit('devMessage', text)
        };
        reader.readAsText(e.target.files[0])
    }

    return (
        <input type={"file"} onChange={(e) => parseFile(e)}></input>
    )
}

export default Dev