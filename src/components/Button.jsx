export default function Button({title}){
    const placeholder = "Click me"
    return(
        <button className="btn btn-success">
            { title ? title : placeholder }

        </button>
    )
}