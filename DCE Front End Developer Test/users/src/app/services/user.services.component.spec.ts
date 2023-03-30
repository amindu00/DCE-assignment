import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IListUsers } from '../list-users/IListUsers';

import { UserService } from './user.service';

describe('ListUsersComponent', () => {
    let component: UserService;
    let fixture: ComponentFixture<UserService>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            declarations: [UserService]
        })
            .compileComponents();

        fixture = TestBed.createComponent(UserService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should return list of users', () => {
        expect(component.getUsers(1)).toBeTruthy();
    });

    it('should handle API response', inject(
        [UserService, HttpTestingController],
        (myService: UserService, httpMock: HttpTestingController) => {
            const mockResponse = {
                "page": 2,
                "per_page": 6,
                "total": 12,
                "total_pages": 2,
                "data": [
                    {
                        "id": 7,
                        "email": "michael.lawson@reqres.in",
                        "first_name": "Michael",
                        "last_name": "Lawson",
                        "avatar": "https://reqres.in/img/faces/7-image.jpg"
                    },
                    {
                        "id": 8,
                        "email": "lindsay.ferguson@reqres.in",
                        "first_name": "Lindsay",
                        "last_name": "Ferguson",
                        "avatar": "https://reqres.in/img/faces/8-image.jpg"
                    },
                    {
                        "id": 9,
                        "email": "tobias.funke@reqres.in",
                        "first_name": "Tobias",
                        "last_name": "Funke",
                        "avatar": "https://reqres.in/img/faces/9-image.jpg"
                    },
                    {
                        "id": 10,
                        "email": "byron.fields@reqres.in",
                        "first_name": "Byron",
                        "last_name": "Fields",
                        "avatar": "https://reqres.in/img/faces/10-image.jpg"
                    },
                    {
                        "id": 11,
                        "email": "george.edwards@reqres.in",
                        "first_name": "George",
                        "last_name": "Edwards",
                        "avatar": "https://reqres.in/img/faces/11-image.jpg"
                    },
                    {
                        "id": 12,
                        "email": "rachel.howell@reqres.in",
                        "first_name": "Rachel",
                        "last_name": "Howell",
                        "avatar": "https://reqres.in/img/faces/12-image.jpg"
                    }
                ],
                "support": {
                    "url": "https://reqres.in/#support-heading",
                    "text": "To keep ReqRes free, contributions towards server costs are appreciated!"
                }
            };

            component.getUsers(1).subscribe((response) => {
                expect(response).toEqual(mockResponse);
            });

            const req = httpMock.expectOne('/api/my-endpoint');
            expect(req.request.method).toEqual('GET');
            req.flush(mockResponse);

            httpMock.verify();
        }
    ));


});
