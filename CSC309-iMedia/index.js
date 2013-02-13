// JavaScript Document
	/* Init main layout and tabbar */
	var dhxLayout = new dhtmlXLayoutObject("content", "1C", "dhx_blue");
	var tabbar = new dhtmlXTabBar("tabbar");
	tabbar.setImagePath("imgs/");
	tabbar.setHrefMode("ajax-html"); 
	tabbar.addTab("a1","Home", "100px");
	tabbar.addTab("a2","Channels", "100px");
	tabbar.addTab("a3","Tags","100px");
	tabbar.addTab("a4","My Content", "120px");
	tabbar.addTab("a5","My Subscriptions", "120px");
	tabbar.addTab("a6","My Productions", "120px");
	tabbar.addTab("a7","My Profile", "120px");
	tabbar.addTab("a8","Accounting", "110px");
	tabbar.setContentHref("a1","home.html");
	tabbar.setContentHref("a2","channels.html");
	tabbar.setContentHref("a3","tags.html");
	tabbar.setContentHref("a4","my_content.html");
	tabbar.setContentHref("a5","my_subscriptions.html");
	tabbar.setContentHref("a6","my_productions.html");
	tabbar.setContentHref("a7","profile.html");
	tabbar.setContentHref("a8","accounting.html");
	tabbar.setTabActive("a1");
	dhxLayout.cells("a").attachObject("tabbar");
	dhxLayout.cells("a").hideHeader();
