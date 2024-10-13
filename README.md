# qe-workshop

### Project Name: QE Workshop

### **Introduction**: 
This is the final project for the QE course taken @Cloudinary

### **Features**: 
   - Login to a cloudinary account on Staging env.
   - Go to the Media Library and use the Upload Widget to upload an image asset to your personal cloud.
   - Have a validation that the file was successfully uploaded and named correctly.
   
### **.env file**: 
   - Modify the .env file with your Cloudinary account's login credentials 
   - !!! DO NOT COMMIT THIS FILE !!!

### **Trigger tests via package.json**:
- scripts:
```
"scripts": {
   "test": "playwright test"
}
```
- Click > next to: 
```shell
"test": "playwright test"
```

### **Trigger tests via terminal using npx**:
   - Open terminal
   - Go to the project location and run:
     `npx playwright test`