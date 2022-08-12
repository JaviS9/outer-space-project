
export default {
    filter(list, input) {
        var filter = input.toUpperCase();
        for (let i = 0; i < list.length; i++) {
            var user = list[i].nickName;
            if (user.toUpperCase().indexOf(filter) > -1) {
                list[i].style.display = "";
            } else {
                list[i].style.display = "none";
            }
        }
    }
}