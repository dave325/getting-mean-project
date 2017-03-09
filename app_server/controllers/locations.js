/**
 * Define the locations controllers 
 */

module.exports.homeList = function(req, res) {
	res.render('locations-list', {
		title : 'Loc8r - find a place to work with wifi',
		pageHeader : {
			title : 'Loc8r',
			strapline : 'Find places to work with wifi near you!'
		},
		sidebar : `
		Looking for wifi and a seat? Loc8r helps you find places to work when out and about.
         Perhaps with coffee, cake, or a pint? Let Loc8r help you find the place you're looking for.
         `,
		locations : [ {
			name : 'Starcups',
			address : '125 High Street, Reading, RG6 IPS',
			rating : 3,
			facilities : [ 'Hot drinks', 'Food', 'Premium wifi' ],
			distance : '100m'
		},
			{
				name : 'Starcups',
				address : '125 High Street, Reading, RG6 IPS',
				rating : 3,
				facilities : [ 'Hot drinks', 'Food', 'Premium wifi' ],
				distance : '100m'
			},
			{
				name : 'Starcups',
				address : '125 High Street, Reading, RG6 IPS',
				rating : 3,
				facilities : [ 'Hot drinks', 'Food', 'Premium wifi' ],
				distance : '100m'
			} ]
	});
};
module.exports.locationInfo = function(req, res) {
	res.render('location-info', {
		title : 'Location Info',
		location : {
			name : 'Starcups',
			address : '125 High Street, Reading, RG6 IPS',
			rating : 3,
			facilities : [ 'Hot drinks', 'Food', 'Premium wifi' ],
			coords : {
				lat: 51.455041,
				lng: -0.9690884
			},
			openingTimes: [{
				days: 'Monday - Thursday',
				opening: '7:00am',
				closing: '7:00pm',
				closed: false
			},
			{
				days:'Saturday',
				opening: '8:00am',
				closing:'5:00pm',
				closed: false
			},
			{
				days:'Sunday',
				closed: true
					
			}],
			review : [{
				author : 'Simon Holmes',
				timStamp : '16 July 2013',
				content : '16 July 2013',
				rating : 3,
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
			},
			{
                author: 'Charlie Chaplin',
                rating: 3,
                timestamp: '16 June 2013',
                reviewText: 'It was okay. Coffee wasn\'t great, but the wifi was fast.'
            }]
		},
		 sidebar: {
	            context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.',
	            callToAction: 'If you\'ve been and you like it - or if you don\'t - please leave a review to help other people just like you.'
	        }
	});
}
module.exports.addReview = function(req, res) {
	res.render('locations-review-form', {
		title : 'Add Review',
		author : 'David'
	});
}