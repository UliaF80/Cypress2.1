describe("petstore api", () => {
    it('creates pet', () => {
        cy.request({
            url: `https://petstore.swagger.io/v2/pet`,
            method: 'POST',
            body: {
                id: 123456123,
                name: 'doggie',
                photoUrls: []
            }
        }).then((response) => {
            expect(response.status).to.be.eql(200)
            expect(response.body).to.be.eql({
                id: 123456123,
                name: 'doggie',
                photoUrls: [],
                tags: []
            })

            cy.request(`https://petstore.swagger.io/v2/pet/${response.body.id}`)
                .then((response) => {
                    expect(response.status).to.be.eql(200)
                    expect(response.body).to.be.eql({
                        id: 123456123,
                        name: 'doggie',
                        photoUrls: [],
                        tags: []
                    })


                })

        })
    })
}) 

describe("petstore api", () => {
    it('creates pet', () => {
        cy.request({
            url: `https://petstore.swagger.io/v2/pet`,
            method: 'POST',
            body: {
                id: 123456,
                name: 'cats',
                photoUrls: []
            }
        })
            cy.request({
                url: `https://petstore.swagger.io/v2/pet`,
                method: 'PUT',
                body: {
                    id: 123456,
                    name: 'maus',
                    photoUrls: []
                }
            }).then((response) => {
                expect(response.status).to.be.eql(200)
                expect(response.body).to.be.eql({
                    id: 123456,
                    name: 'maus',
                    photoUrls: [],
                    tags: []
                })
            })
           
            })
        })
    


    describe('DELETE Petstore Api', () => {
        it('Delete pet', () => {
            cy.request('DELETE', 'https://petstore.swagger.io/v2/pet/123456123')
                .then((response) => {
                    expect(response.body).to.be.eql({
                        code: 200,
                        type: 'unknown',
                        message: '123456123'
                    })
                })
        })
    })