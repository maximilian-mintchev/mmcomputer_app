export class PaginationResponseParams {

    private _totalItems: number;
    private _totalPages: number;
    private _currentPage: number;


	constructor(totalItems: number, totalPages: number, currentPage: number) {
		this._totalItems = totalItems;
		this._totalPages = totalPages;
		this._currentPage = currentPage;
	}


    /**
     * Getter totalItems
     * @return {number}
     */
	public get totalItems(): number {
		return this._totalItems;
	}

    /**
     * Getter totalPages
     * @return {number}
     */
	public get totalPages(): number {
		return this._totalPages;
	}

    /**
     * Getter currentPage
     * @return {number}
     */
	public get currentPage(): number {
		return this._currentPage;
	}

    /**
     * Setter totalItems
     * @param {number} value
     */
	public set totalItems(value: number) {
		this._totalItems = value;
	}

    /**
     * Setter totalPages
     * @param {number} value
     */
	public set totalPages(value: number) {
		this._totalPages = value;
	}

    /**
     * Setter currentPage
     * @param {number} value
     */
	public set currentPage(value: number) {
		this._currentPage = value;
	}


}