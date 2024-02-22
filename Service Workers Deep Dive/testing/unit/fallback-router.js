function getFallback(url) {
    
    if(url==='slow-end-point') {
        return 'svgcontent';
    }
    
    return 'no-fallback';
}

module.exports = {
    getFallback: getFallback
}
