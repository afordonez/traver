import { TestBed } from '@angular/core/testing';
import { ViajesService } from './viajes.service';
describe('ViajesService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ViajesService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=viajes.service.spec.js.map