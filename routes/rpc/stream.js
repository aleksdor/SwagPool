module.exports = {
    /**
     * List all available streams.
     * @returns 
     */
    list(){
        return [
            {id: 1, name: "stream1", "url": "url1", "state": "online"},
            {id: 2, name: "stream2", "url": "url2", "state": "voting"},
            {id: 3, name: "stream3", "url": "url3", "state": "offline"}
        ]
    }
}