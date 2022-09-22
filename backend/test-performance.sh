for i in {1..1000}
do
	curl --location --request POST 'http://localhost:4000/trpc/createItem?batch=1' \
	--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzZjMzgzYjZhYWJkOTYwNjcxNzE2MiIsImlhdCI6MTY1ODA1OTcyOH0.2vV2onS_WMypVD5MJnMVSK1ehp09TXQduzF3jbimuaw' \
	--header 'Content-Type: application/json' \
	--data-raw '{
			"0": {
					"name": "Test performance",
					"quantity": 1
					"position": "TUV",
					"tags": [
							"pc"
					],
					"projectName": "test"
			}
	}'
done