import { useCallback, useEffect, useMemo, useState } from "react"


function sortMyArray(arr:number[]){
    checkRender("Sort array");
    return arr.sort();
}
export const LearningHooks = () => {
    const [counter, setCounter] = useState(0);
    const [counter2, setCounter2] = useState(0);
    const [myArray] = useState([5,4,1,2]);

    const sortedArray = sortMyArray(myArray);
    console.log(sortedArray);


    checkRender("-");

    const reset = useCallback(() => { //functionnya di return jadi ga di eksekusi, jadi di console log ga ada
        checkRender("useCallback");
        setCounter(0);
        setCounter2(0);
    }, [])

    // const reset2 = () => { //ga ada bedanya sama yg usecallback, karena yg pake dependency list dia bakal protest
    //     checkRender("ga pake useCallback");
    //     setCounter(0);
    //     setCounter2(0);
    // }

    // useEffect(()=>{
    //     checkRender("use effect reset")
    //     if (counter2 >= 3 && counter >=3){
    //         reset2();
    //     }
    // }, [counter,counter2, reset2])

    // const checking = (a: number) => {
    //     console.log("checking called");
    //     return a>=3
    // }

    // if (checking(counter) && checking(counter2)){ //sekarang bisa ga usah pake useeffect
    //     checkRender("call reset");
    //     reset2();
    // }

    const updatedCounter = useMemo(() => { //nilai atau kalkulasi berubah jika depedency berubah, jadi misalnya kalau yg dipencet counter 2 ga akan berubah tp kalau counter 1 baru bisa berubah
        checkRender("UpdatedCounter");
        return counter * 4;
    }, [counter])

    const updateSort = useMemo(() => {
        checkRender("sekali aja sortednya") //ini muncul sekali aja di console lognya 
        return sortMyArray(myArray);
    }, [myArray]);
    console.log(updateSort);

    useEffect(() => {
        checkRender("Update counter 2: " + counter2);
    }, [counter2]) //ini dependency listnya jadi bisa di eksekusi lagi asal beda (bisa lebih dari 1), kalau kosong dia dijalaninnya sekali aja yg renderingnya

    return (
        <div>
            <h1>LearningHooks</h1>
            <button onClick={() => setCounter(counter + 1)} >counter {counter}</button>
            <button onClick={() => setCounter2(counter2 + 1)} >counter2 {counter2}</button>
            <button onClick={reset}>Reset</button>
            <br/>
            counter * 4 = {updatedCounter}
        </div>
    )
}

export default LearningHooks; //harus kaya gini soalnya yang diatas tuh const kalau misalnya function langsung tambahin default aja

function checkRender(label: string){
    console.log("rendering ", label, Math.random());
}