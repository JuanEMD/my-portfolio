const SectionContainer = ({ id, children, className }) => {

    const classes = `${className} pt-25 w-full`

    return (<section id={id} className={classes}>{children}</section>)
}

export default SectionContainer