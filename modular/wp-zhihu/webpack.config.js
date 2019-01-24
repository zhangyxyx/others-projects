module.exports={
	entry:__dirname+"/app/js/main.js",
	output:{
		path:__dirname+"/public",
		filename:'bundle.js'
	},
	module:{
		loaders:[
			{test:/\.css$/,loader:'style-loader!css-loader'}
		]
	}

}