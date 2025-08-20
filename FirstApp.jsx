import PropTypes from "prop-types";

const FristApp = ({title, sum }) => {
    return (
        <>
        <h1> { title } </h1>
        <span> {sum} </span>
        </>
    )
}

FristApp.PropTypes = {
    title: PropTypes.string.isRequired,
    sum: PropTypes.number.isRequired
}

FristApp.defautProps = {
    title: 'no hay titulo',
    sum: 300
}
export default FristApp