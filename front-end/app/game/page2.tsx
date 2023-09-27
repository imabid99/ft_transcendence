





const Game = () => {



    return ( 
    <div className="overflow-hidden flex justify-center items-center min-h-screen">

        <canvas className="webgl fixed top-0 left-0 outline-none">

        </canvas>
        <div id="loading-overlay" className="fixed top-0 left-0 w-full h-full bg-black z-50 opacity-100 transition-opacity duration-500 pointer-events-none">

        </div>
        <div className="loading-bar w-1/2 bg-gray-200 rounded-full h-6 dark:bg-gray-700 mx-auto">
            <div className="bg-blue-600 h-6 rounded-full" style={{ width: "100%" } as React.CSSProperties}>

            </div>
        </div>
    </div>
    )
} 
    

export default Game;