export const getColorFromType = (type) => {
    switch (type) {
        case "Analytical":
            return "rgba(220, 63, 63, 0.25)";
        case "Creative":
            return "rgba(43, 73, 231, 0.25)";
        case "Engineering":
            return "rgba(251, 170, 11, 0.25)";
    }
};

export const getBackgroundString = (types, degrees) => {
    let colors = types.map(getColorFromType);
    let background = `linear-gradient(${degrees}, `;
    switch (colors.length) {
        case 0:
            background = "white";
            break;
        case 1:
            background += colors[0] + " 0%, " + colors[0] + " 100%)";
            break;
        case 2:
            background += colors[0] + " 0%, " + colors[1] + " 100%)";
            break;
        case 3:
            background +=
                colors[0] +
                " 0%, " +
                colors[1] +
                " 50%, " +
                colors[2] +
                " 100%)";
            break;
    }
    return background;
};
