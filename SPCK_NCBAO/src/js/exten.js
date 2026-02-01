
/**
 * Ham suu ly khi bam Xem mô tả
 */
function getDesInput() {
    const adress = document.getElementById("txtAdress").value.trim();
    getDes(adress);
}

/**
 * @param keyword địa điểm cần lấy mô tả 
 */
async function getDes(keyword) {
    
    fetch("https://vi.wikipedia.org/api/rest_v1/page/summary/" + keyword)
        .then(res => res.json())
        .then(data => {
            document.getElementById("contenAdress").innerHTML = data.extract_html;
            let notification = document.getElementById("bgrAdress");
            notification.style.backgroundImage = `url(${data.originalimage.source})`;
            notification.style.backgroundSize = "cover";      // cho ảnh phủ kín
            notification.style.backgroundPosition = "center"; // căn giữa
            notification.style.backgroundRepeat = "no-repeat";
        })
        .catch(err => console.log(err));

}