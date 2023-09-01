import myStore from "../storage/store";

export const app = () => {
    (()=>{
        console.log(myStore.dateTotay.toLocaleDateString());
        myStore.initStore();
    })();
}