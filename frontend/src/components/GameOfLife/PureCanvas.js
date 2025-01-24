const PureCanvas = ({ contextRef }) => {
    return (
        <canvas
            width="600"
            height="400"
            ref={(node) => node && contextRef(node.getContext("2d"))}
            className="border border-gray-500"
        ></canvas>
    );
};

export default PureCanvas;