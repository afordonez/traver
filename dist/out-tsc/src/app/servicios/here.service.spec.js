import { TestBed } from '@angular/core/testing';
import { HereService } from './here.service';
describe('HereService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(HereService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=here.service.spec.js.map