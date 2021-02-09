function FormProgress(element, total, current){
    const defaultSize = "20px";
    
    function parseSize(value){
        return parseFloat(value);
    }
    function parseUnit(value){
        let size = value;
        let unit = size.replace(parseSize(value)+"","");
        return unit;
    }
    let data = {
        root : element,
        progress: element.find("div.progress"),
        progress_bar: element.find("div.progress div.progress-bar"),
        progress_info : element.find("div.progress-info"),
        circles: element.find("div.progress-info .progress-text"),
        size : defaultSize,
        sizeValue : parseSize(defaultSize),
        sizeUnit : parseUnit(defaultSize),
        totalProgress : 0,
        currentProgress : 0,
        configure : function(total, current){
            this.totalProgress = total;
            this.currentProgress = current;
            //Set the aria-values
            this.progress_bar.attr('aria-valuenow', this.currentProgress);
            this.progress_bar.attr('aria-valuemax',this.totalProgress);
            this.render();
        },
        renderSize : function(){
            
            //Setting the size of root element
            this.root.height(this.size);
            
            //Setting size of progress bar
            this.progress.width('calc(100% - '+this.size);
            this.progress.height(this.sizeValue/2+this.sizeUnit);
                
            //setting the progressText
            let progressTextCss = {
                "width":this.size,
                "height":this.size,
                "border-radius":(this.sizeValue/2)+this.sizeUnit,
                "font-size":(this.sizeValue/2)+this.sizeUnit,
                "line-height":this.size,
            };
            this.circles.css(progressTextCss);
        },
        render : function(){
            //setting the ariavalue
            this.progress_bar.attr("aria-valuenow",this.currentProgress);
            let progressValue = ((this.currentProgress-1)/(this.totalProgress - 1)*100).toFixed(2);
            this.progress_bar.width(progressValue+"%");
            
            //set the color of circle
            this.circles.attr('class','progress-text bg-light');
            for(let i=1; i<=this.currentProgress; i++){
                this.progress_info.find(":nth-child("+i+")").attr("class","progress-text bg-primary text-white");
            }
        
        },
        setSize : function(value){
            this.size = value;
            this.sizeValue = parseSize(value);
            this.sizeUnit = parseUnit(value);
            this.renderSize();
        },
        setProgress : function(value){
            if(value > 0 && value <= this.totalProgress){
                this.currentProgress = value;
                this.render();
            }else{
                console.log("ERROR : Out of Range");
            }
        },
        next : function(){
            if(this.currentProgress < this.totalProgress){
                this.setProgress(this.currentProgress + 1);
            }
        },
        back : function(){
            if(this.currentProgress > 1){
                this.setProgress(this.currentProgress - 1);
            }
        },
    }
    data.configure(total, current);
    return data;
}