 

export default {

    // let img = this.$refs.photo.files[0]
    // console.log(img)
    // let blob = new Blob([img], { type: "image/*" });
    // let buffer = await blob.arrayBuffer()
    // let base64 = Buffer.from(buffer).toString('base64')
    // console.log("buffer -- " + buffer)
    // this.photo = base64

    // updatePhoto(files) {
    //   if (!files.length) {
    //     // Store the file data
    //     let buffer = Buffer.from(this.$refs.photo.data)
    //     let base64 = Buffer.from(buffer).toString('base64')
    //     this.photo = base64
    //   }
    // },

    // async getImage(image) {
    //   try {
    //     let response = await axios.get(image, {
    //       responseType: "arraybuffer"
    //     })
    //     // let response = await axios.get(this.previewImage)
    //     let base64 = Buffer.from(response.data).toString('base64')
    //     this.photo = base64
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },

    selectImage () {
        this.$refs.photo.click();
    },

    pickFile () {
        try {
            let input = this.$refs.photo
            let file = input.files
            let reader = new FileReader
            if (file && file[0]) {
            this.photo = file[0]
            reader.onload = e => {
                this.previewImage = e.target.result
            }
            reader.readAsDataURL(file[0])
            this.$emit('input', file[0])
            }
        } catch (e) {
            console.log(e)
        }
    },

    getImage(photo) {
        // var base64 = Buffer.from(photo, "binary").toString("base64")
        // let url = "data:image/jpeg;base64," + photo;
        try {
          // var blob = new Blob([photo.data], { type: "image/png" });
          // var imageUrl = URL.createObjectURL(blob);
          // console.log("URL -- " + imageUrl)
          // return imageUrl;
          let buffer = Buffer.from(photo.data)
          let base64 = Buffer.from(buffer, "binary").toString("base64")
          let img = 'data:image/png;base64,'+ base64
          // console.log(img)
          return img
          // let reader = new FileReader
          // reader.readAsDataURL(photo)
          // console.log("URL -- " + photo)
          // return photo
        } catch (e) {
          console.log(e)
        }
    },
    
    // -------------------------------------------------

    updatePhoto(files) {
        if (!files.length) {
            let reader = new FileReader
            this.photo = reader.readAsArrayBuffer(this.previewImage)
        }
    },

    getImage() {
        try {
            let img = this.user.photo
            if(img != null) {
            let buffer = Buffer.from(img.data)
            // let blob = new Blob([img], { type: "image/jpeg" });
            // let url =  URL.createObjectURL(blob)
            let base64 = Buffer.from(buffer).toString('base64')
            let url = "data:image/png;base64," + base64
            // let url = 'data:image/jpeg;base64,' + blob
            this.previewImage = url
            }
        } catch (e) {
            console.log(e)
        }
    },

    getImage2(photo) {
        // var base64 = Buffer.from(photo, "binary").toString("base64")
        // let url = "data:image/jpeg;base64," + photo;
        try {
          // var blob = new Blob([photo.data], { type: "image/png" });
          // var imageUrl = URL.createObjectURL(blob);
          // console.log("URL -- " + imageUrl)
          // return imageUrl;
          let buffer = Buffer.from(photo.data)
          let base64 = Buffer.from(buffer, "binary").toString("base64")
          let img = 'data:image/png;base64,'+ base64
          // console.log(img)
          return img
          // let reader = new FileReader
          // reader.readAsDataURL(photo)
          // console.log("URL -- " + photo)
          // return photo
        } catch (e) {
          console.log(e)
        }
    },
}